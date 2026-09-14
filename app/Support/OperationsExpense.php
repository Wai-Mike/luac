<?php

namespace App\Support;

use App\Models\AssociationExpense;
use App\Models\AssociationReceipt;
use App\Models\LogisticsDocument;
use App\Models\PurchaseRequest;
use Illuminate\Support\Facades\Schema;

class OperationsExpense
{
    public const SOURCE_PURCHASE_REQUEST = 'purchase_request';

    public const SOURCE_PURCHASE_REQUEST_ITEM = 'purchase_request_item';

    public const SOURCE_RECEIPT = 'receipt';

    public const SOURCE_LOGISTICS = 'logistics';

    /**
     * Logistics papers that represent settled spend rather than quotes, orders, or waybills.
     *
     * @var list<string>
     */
    public const SETTLED_LOGISTICS_KINDS = [
        'invoice',
        'goods_received',
    ];

    public static function syncPaid(): void
    {
        if (! Schema::hasTable('association_expenses')) {
            return;
        }

        if (Schema::hasTable('purchase_requests')) {
            PurchaseRequest::query()
                ->with('items')
                ->where('status', PurchaseRequest::STATUS_PAID)
                ->get()
                ->each(fn (PurchaseRequest $order) => static::fromPurchaseRequest($order));
        }

        if (Schema::hasTable('association_receipts')) {
            AssociationReceipt::query()
                ->with('purchaseRequest')
                ->where('amount', '>', 0)
                ->get()
                ->each(fn (AssociationReceipt $receipt) => static::fromReceipt($receipt));
        }

        if (Schema::hasTable('logistics_documents')) {
            LogisticsDocument::query()
                ->with('purchaseRequest')
                ->whereIn('kind', self::SETTLED_LOGISTICS_KINDS)
                ->where('amount', '>', 0)
                ->get()
                ->each(fn (LogisticsDocument $document) => static::fromLogistics($document));
        }
    }

    public static function fromPurchaseRequest(PurchaseRequest $order): void
    {
        if ($order->status !== PurchaseRequest::STATUS_PAID) {
            return;
        }

        $order->loadMissing('items');
        $spentAt = optional($order->paid_at)->toDateString() ?: now()->toDateString();
        $currency = static::expenseCurrency($order->currency);
        $recorderId = $order->paid_by ?: $order->requested_by;

        if ($order->items->isNotEmpty()) {
            foreach ($order->items as $item) {
                $amount = round(((float) $item->quantity) * ((float) $item->unit_cost), 2);
                if ($amount <= 0) {
                    continue;
                }

                static::upsert(self::SOURCE_PURCHASE_REQUEST_ITEM, (int) $item->id, [
                    'department_id' => $order->department_id,
                    'recorded_by' => $recorderId,
                    'category' => AssociationExpense::CATEGORY_PROCUREMENT,
                    'title' => $item->description,
                    'detail' => trim(sprintf(
                        'Paid %s · %s × %s @ %s%s',
                        $order->reference,
                        rtrim(rtrim(number_format((float) $item->quantity, 2), '0'), '.'),
                        $item->description,
                        number_format((float) $item->unit_cost, 2),
                        $order->purpose ? ' · '.$order->purpose : ''
                    )),
                    'amount' => $amount,
                    'currency' => $currency,
                    'spent_at' => $spentAt,
                    'notes' => $order->reference,
                ]);
            }

            return;
        }

        $amount = round((float) $order->amount, 2);
        if ($amount <= 0) {
            return;
        }

        static::upsert(self::SOURCE_PURCHASE_REQUEST, (int) $order->id, [
            'department_id' => $order->department_id,
            'recorded_by' => $recorderId,
            'category' => AssociationExpense::CATEGORY_PROCUREMENT,
            'title' => $order->title,
            'detail' => trim('Paid '.$order->reference.($order->purpose ? ' · '.$order->purpose : '')),
            'amount' => $amount,
            'currency' => $currency,
            'spent_at' => $spentAt,
            'notes' => $order->reference,
        ]);
    }

    public static function fromReceipt(AssociationReceipt $receipt): void
    {
        $amount = round((float) $receipt->amount, 2);
        if ($amount <= 0) {
            return;
        }

        $linked = $receipt->purchaseRequest;
        if ($linked && $linked->status === PurchaseRequest::STATUS_PAID) {
            return;
        }

        $spentAt = optional($receipt->received_on)->toDateString() ?: optional($receipt->created_at)->toDateString() ?: now()->toDateString();

        static::upsert(self::SOURCE_RECEIPT, (int) $receipt->id, [
            'department_id' => $receipt->department_id,
            'recorded_by' => $receipt->recorded_by,
            'category' => AssociationExpense::CATEGORY_PROCUREMENT,
            'title' => $receipt->title,
            'detail' => trim(sprintf(
                'Receipt %s%s%s',
                $receipt->reference,
                $receipt->vendor ? ' · '.$receipt->vendor : '',
                $receipt->notes ? ' · '.$receipt->notes : ''
            )),
            'amount' => $amount,
            'currency' => static::expenseCurrency($receipt->currency),
            'spent_at' => $spentAt,
            'notes' => $receipt->reference,
        ]);
    }

    public static function fromLogistics(LogisticsDocument $document): void
    {
        if (! in_array($document->kind, self::SETTLED_LOGISTICS_KINDS, true)) {
            return;
        }

        if ($document->purchase_request_id) {
            return;
        }

        $amount = round((float) $document->amount, 2);
        if ($amount <= 0) {
            $amount = round(collect($document->lineItems())->sum(fn (array $item) => $item['quantity'] * $item['unit_cost']), 2);
        }
        if ($amount <= 0) {
            return;
        }

        $lines = $document->lineItems();
        $detailLines = collect($lines)->map(function (array $item) {
            return sprintf(
                '%s × %s @ %s',
                rtrim(rtrim(number_format((float) $item['quantity'], 2), '0'), '.'),
                $item['description'],
                number_format((float) $item['unit_cost'], 2)
            );
        })->implode('; ');

        $spentAt = optional($document->document_date)->toDateString() ?: optional($document->created_at)->toDateString() ?: now()->toDateString();

        static::upsert(self::SOURCE_LOGISTICS, (int) $document->id, [
            'department_id' => $document->department_id,
            'recorded_by' => $document->uploaded_by,
            'category' => AssociationExpense::CATEGORY_PROCUREMENT,
            'title' => $document->title,
            'detail' => trim(sprintf(
                '%s %s%s%s',
                $document->kind_label,
                $document->reference,
                $document->vendor || $document->party_to ? ' · '.($document->vendor ?: $document->party_to) : '',
                $detailLines ? ' · '.$detailLines : ''
            )),
            'amount' => $amount,
            'currency' => static::expenseCurrency($document->currency),
            'spent_at' => $spentAt,
            'notes' => $document->reference,
        ]);
    }

    /**
     * @param  array<string, mixed>  $attributes
     */
    protected static function upsert(string $sourceType, int $sourceId, array $attributes): void
    {
        AssociationExpense::withoutEvents(function () use ($sourceType, $sourceId, $attributes) {
            AssociationExpense::query()->updateOrCreate(
                [
                    'source_type' => $sourceType,
                    'source_id' => $sourceId,
                ],
                $attributes
            );
        });
    }

    protected static function expenseCurrency(?string $currency): string
    {
        return strtolower(AssociationMoney::currency($currency)) === 'usd' ? 'usd' : 'ssp';
    }
}
