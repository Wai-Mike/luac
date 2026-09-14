@extends('operations.documents.layout')

@php
    $items = $document->lineItems();
    $details = $document->details ?? [];
    $lineTotal = collect($items)->sum(fn ($item) => $item['quantity'] * $item['unit_cost']);
    $total = $document->amount !== null ? (float) $document->amount : $lineTotal;
    $currencyLabel = \App\Support\AssociationMoney::currencyLabel($document->currency);
    $paymentLabel = \App\Support\AssociationMoney::paymentLabel($details['payment_method'] ?? null);
@endphp

@section('title', $document->kind_label)
@section('downloadUrl', $document->download_url)

@section('body')
    <div class="meta">
        <div><strong>Reference</strong><span class="ref">{{ $document->reference }}</span></div>
        <div><strong>Date</strong>{{ optional($document->document_date)->format('d M Y') ?: $document->created_at?->format('d M Y') }}</div>
        <div><strong>Document</strong>{{ $document->title }}</div>
        <div><strong>Department</strong>{{ $document->department?->name ?: 'Association' }}</div>
        <div><strong>From</strong>{{ $document->party_from ?: $org['name'] }}</div>
        <div><strong>To / vendor</strong>{{ $document->party_to ?: ($document->vendor ?: '—') }}</div>
        @if($document->kind === 'waybill')
            <div><strong>Origin</strong>{{ $details['origin'] ?? '—' }}</div>
            <div><strong>Destination</strong>{{ $details['destination'] ?? '—' }}</div>
            <div><strong>Vehicle</strong>{{ $details['vehicle_reg'] ?? '—' }}</div>
            <div><strong>Driver</strong>{{ $details['driver_name'] ?? '—' }}</div>
        @endif
        @if(in_array($document->kind, ['quotation', 'invoice'], true))
            <div><strong>Payment terms</strong>{{ $details['payment_terms'] ?? 'As agreed' }}</div>
            <div><strong>Valid until</strong>{{ $details['valid_until'] ?? '—' }}</div>
        @endif
        @if(in_array($document->kind, ['lpo', 'purchase_request', 'delivery_note'], true))
            <div><strong>Delivery address</strong>{{ $details['delivery_address'] ?? $org['address'] }}</div>
            <div><strong>Expected delivery</strong>{{ $details['expected_delivery'] ?? '—' }}</div>
        @endif
        @if($document->kind === 'goods_received')
            <div><strong>Received by</strong>{{ $details['received_by'] ?? '—' }}</div>
            <div><strong>Condition</strong>{{ $details['condition'] ?? 'Good order' }}</div>
        @endif
        @if($document->purchaseRequest)
            <div><strong>Linked PRO</strong>{{ $document->purchaseRequest->reference }}</div>
        @endif
        <div><strong>Prepared by</strong>{{ $document->uploader?->name ?: 'Finance' }}</div>
        <div><strong>Currency</strong>{{ $currencyLabel }}</div>
        <div><strong>Payment method</strong>{{ $paymentLabel }}</div>
        @if(($details['payment_method'] ?? null) === 'bank_transfer' && filled($details['bank_details'] ?? null))
            <div><strong>Bank details</strong>{{ $details['bank_details'] }}</div>
        @endif
    </div>

    @if($items !== [])
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="num">Qty</th>
                    <th>Unit</th>
                    <th class="num">Unit cost</th>
                    <th class="num">Amount</th>
                </tr>
            </thead>
            <tbody>
                @foreach($items as $item)
                    <tr>
                        <td>{{ $item['description'] }}</td>
                        <td class="num">{{ $item['quantity'] }}</td>
                        <td>{{ $item['unit'] }}</td>
                        <td class="num">{{ number_format($item['unit_cost'], 2) }}</td>
                        <td class="num">{{ number_format($item['quantity'] * $item['unit_cost'], 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <p class="total">Total: {{ $currencyLabel }} {{ number_format($total, 2) }}</p>
    @elseif($total > 0)
        <p class="total">Amount: {{ $currencyLabel }} {{ number_format($total, 2) }}</p>
    @endif

    @if($document->notes)
        <div class="notes"><strong>Notes</strong><br>{{ $document->notes }}</div>
    @endif

    <div class="signs">
        <div class="sign">Prepared by<br>{{ $document->uploader?->name ?: 'Finance / Logistics' }}</div>
        @if($document->kind === 'waybill')
            <div class="sign">Received by / consignee</div>
        @elseif(in_array($document->kind, ['delivery_note', 'goods_received'], true))
            <div class="sign">Received / inspected by</div>
        @elseif(in_array($document->kind, ['lpo', 'purchase_request', 'invoice'], true))
            <div class="sign">Authorised by Chairman / Finance</div>
        @else
            <div class="sign">Approved by</div>
        @endif
    </div>
@endsection
