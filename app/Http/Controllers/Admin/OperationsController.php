<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssociationEvent;
use App\Models\AssociationMeeting;
use App\Models\AssociationReceipt;
use App\Models\AssociationReport;
use App\Models\AssociationTask;
use App\Models\Department;
use App\Models\LogisticsDocument;
use App\Models\PurchaseRequest;
use App\Models\User;
use App\Support\AssociationAms;
use App\Support\AssociationLetterhead;
use App\Support\AssociationMoney;
use App\Support\DepartmentalReport;
use App\Support\EventPlanning;
use App\Support\OperationsExpense;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OperationsController extends Controller
{
    public function index()
    {
        $this->expirePastMeetings();

        $user = request()->user();

        return Inertia::render('admin/operations/index', [
            'reports' => AssociationReport::query()
                ->with(['author:id,name', 'department:id,name,code', 'approver:id,name'])
                ->tap(fn (Builder $q) => $this->scopeDepartment($q, $user))
                ->latest()
                ->get(),
            'meetings' => AssociationMeeting::query()
                ->with(['organizer:id,name', 'attendees:id,name', 'department:id,name'])
                ->tap(fn (Builder $q) => $this->scopeDepartment($q, $user))
                ->orderByDesc('starts_at')
                ->get(),
            'tasks' => AssociationTask::query()
                ->with(['assignee:id,name', 'assigner:id,name'])
                ->tap(fn (Builder $q) => $this->scopeDepartment($q, $user))
                ->latest()
                ->get(),
            'events' => Schema::hasTable('association_events')
                ? AssociationEvent::query()
                    ->with(['committee:id,name', 'budgetItems', 'tasks.assignee:id,name', 'department:id,name', 'creator:id,name'])
                    ->tap(fn (Builder $q) => $this->scopeDepartment($q, $user))
                    ->latest('event_date')
                    ->get()
                : [],
            'purchase_requests' => Schema::hasTable('purchase_requests')
                ? PurchaseRequest::query()
                    ->with(['requester:id,name', 'reviewer:id,name', 'approver:id,name', 'payer:id,name', 'department:id,name', 'items'])
                    ->tap(fn (Builder $q) => $this->scopeDepartment($q, $user))
                    ->latest()
                    ->get()
                : [],
            'receipts' => Schema::hasTable('association_receipts')
                ? AssociationReceipt::query()
                    ->with(['recorder:id,name', 'department:id,name', 'purchaseRequest:id,title'])
                    ->tap(fn (Builder $q) => $this->scopeDepartment($q, $user))
                    ->latest()
                    ->get()
                : [],
            'logistics' => Schema::hasTable('logistics_documents')
                ? LogisticsDocument::query()
                    ->with(['uploader:id,name', 'department:id,name'])
                    ->tap(fn (Builder $q) => $this->scopeDepartment($q, $user))
                    ->latest()
                    ->get()
                : [],
            'executives' => User::query()
                ->where(fn ($q) => $q->where('is_executive', true)->orWhere('role', User::ROLE_ADMIN))
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'department_id', 'office']),
            'departments' => Department::query()->orderBy('name')->get(['id', 'name', 'code', 'slug']),
            'locked_department_id' => $this->lockedDepartmentId($user),
            'capabilities' => [
                'review_orders' => (bool) $user?->canReviewPurchaseOrders(),
                'approve_orders' => (bool) $user?->canApprovePurchaseOrders(),
                'release_payment' => (bool) $user?->canReleasePayment(),
                'publish_reports' => (bool) $user?->canPublishPublicReports(),
                'release_holds' => (bool) $user?->canReleaseBudgetHold(),
                'manage_budgets' => (bool) $user?->canManageBudgets(),
            ],
        ]);
    }

    public function storeReport(Request $request)
    {
        $data = $this->validateReport($request);
        $canPublish = (bool) $request->user()?->canPublishPublicReports();
        $file = $this->storeUpload($request->file('document'), 'operations/reports');
        $payload = DepartmentalReport::normalize($data['payload'] ?? []);

        AssociationReport::query()->create(array_merge($this->reportAttributes($request, $data, $payload, $canPublish), [
            'file_path' => $file['path'],
            'file_name' => $file['name'],
            'created_by' => $request->user()?->id,
            'approved_by' => $canPublish && ($data['is_public'] ?? false) ? $request->user()?->id : null,
        ]));

        return back()->with('success', 'Departmental report saved.');
    }

    public function updateReport(Request $request, AssociationReport $report)
    {
        $data = $this->validateReport($request);
        $canPublish = (bool) $request->user()?->canPublishPublicReports();
        $file = $this->storeUpload($request->file('document'), 'operations/reports');
        $payload = DepartmentalReport::normalize($data['payload'] ?? $report->payload);

        $report->update(array_merge($this->reportAttributes($request, $data, $payload, $canPublish, $report), [
            'file_path' => $file['path'] ?? $report->file_path,
            'file_name' => $file['name'] ?? $report->file_name,
            'approved_by' => $canPublish && ($data['is_public'] ?? false) ? $request->user()?->id : $report->approved_by,
        ]));

        return back()->with('success', 'Departmental report updated.');
    }

    public function approveReport(Request $request, AssociationReport $report)
    {
        abort_unless($request->user()?->canPublishPublicReports(), 403);

        $report->update([
            'approval_status' => 'approved',
            'is_public' => true,
            'status' => 'published',
            'kind' => 'association',
            'approved_by' => $request->user()?->id,
        ]);

        return back()->with('success', 'Report approved for the public website.');
    }

    public function destroyReport(AssociationReport $report)
    {
        $report->delete();

        return back()->with('success', 'Report removed.');
    }

    public function showReport(AssociationReport $report)
    {
        return $this->renderDepartmentalReport($report, download: false);
    }

    public function downloadReport(AssociationReport $report)
    {
        return $this->renderDepartmentalReport($report, download: true);
    }

    public function storeMeeting(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'agenda' => ['nullable', 'string', 'max:4000'],
            'notes' => ['nullable', 'string', 'max:4000'],
            'location' => ['nullable', 'string', 'max:255'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'status' => ['nullable', Rule::in(['scheduled', 'completed', 'cancelled'])],
            'attendee_ids' => ['nullable', 'array'],
            'attendee_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $meeting = AssociationMeeting::query()->create([
            'title' => $data['title'],
            'agenda' => $data['agenda'] ?? null,
            'notes' => $data['notes'] ?? null,
            'location' => $data['location'] ?? null,
            'starts_at' => $data['starts_at'],
            'ends_at' => $data['ends_at'] ?? null,
            'status' => $data['status'] ?? 'scheduled',
            'created_by' => $request->user()?->id,
            'department_id' => $request->user()?->department_id,
        ]);

        $meeting->attendees()->sync($data['attendee_ids'] ?? []);

        return back()->with('success', 'Meeting scheduled.');
    }

    public function updateMeeting(Request $request, AssociationMeeting $meeting)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'agenda' => ['nullable', 'string', 'max:4000'],
            'notes' => ['nullable', 'string', 'max:4000'],
            'location' => ['nullable', 'string', 'max:255'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'status' => ['required', Rule::in(['scheduled', 'completed', 'cancelled'])],
            'attendee_ids' => ['nullable', 'array'],
            'attendee_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $meeting->update([
            'title' => $data['title'],
            'agenda' => $data['agenda'] ?? null,
            'notes' => $data['notes'] ?? ($meeting->notes ?? null),
            'location' => $data['location'] ?? null,
            'starts_at' => $data['starts_at'],
            'ends_at' => $data['ends_at'] ?? null,
            'status' => $data['status'],
        ]);

        if ($request->has('attendee_ids')) {
            $meeting->attendees()->sync($data['attendee_ids'] ?? []);
        }

        return back()->with('success', 'Meeting updated.');
    }

    public function destroyMeeting(AssociationMeeting $meeting)
    {
        $meeting->delete();

        return back()->with('success', 'Meeting removed.');
    }

    public function storeTask(Request $request)
    {
        $request->merge([
            'assigned_to' => $request->filled('assigned_to') ? $request->integer('assigned_to') : null,
            'meeting_id' => $request->filled('meeting_id') ? $request->integer('meeting_id') : null,
            'event_id' => $request->filled('event_id') ? $request->integer('event_id') : null,
        ]);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:4000'],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
            'meeting_id' => ['nullable', 'integer', 'exists:association_meetings,id'],
            'event_id' => ['nullable', 'integer'],
            'due_on' => ['nullable', 'date'],
            'priority' => ['nullable', Rule::in(['urgent', 'high', 'moderate', 'normal', 'low'])],
            'status' => ['nullable', Rule::in(['open', 'in_progress', 'done'])],
            'is_delegation' => ['sometimes', 'boolean'],
        ]);

        AssociationTask::query()->create([
            ...$data,
            'priority' => $data['priority'] ?? 'moderate',
            'status' => $data['status'] ?? 'open',
            'is_delegation' => (bool) ($data['is_delegation'] ?? false),
            'assigned_by' => $request->user()?->id,
            'department_id' => $request->user()?->department_id,
        ]);

        return back()->with('success', $request->boolean('is_delegation') ? 'Delegation assigned.' : 'Task assigned.');
    }

    public function updateTask(Request $request, AssociationTask $task)
    {
        $request->merge([
            'assigned_to' => $request->filled('assigned_to') ? $request->integer('assigned_to') : null,
        ]);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:4000'],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
            'due_on' => ['nullable', 'date'],
            'priority' => ['required', Rule::in(['urgent', 'high', 'moderate', 'normal', 'low'])],
            'status' => ['required', Rule::in(['open', 'in_progress', 'done'])],
            'is_delegation' => ['sometimes', 'boolean'],
        ]);

        $task->update($data);

        return back()->with('success', 'Task updated.');
    }

    public function destroyTask(AssociationTask $task)
    {
        $task->delete();

        return back()->with('success', 'Task removed.');
    }

    public function storeEvent(Request $request)
    {
        $data = $this->validateEvent($request);
        $event = AssociationEvent::query()->create($this->eventAttributes($request, $data));
        $this->syncCommittee($event, $data['committee'] ?? [], $data['committee_ids'] ?? []);
        $this->syncBudgetItems($event, $data['budget_items'] ?? EventPlanning::BUDGET_STREAMS);
        $event->update(['total_budget' => $event->fresh('budgetItems')->grand_total]);

        return back()->with('success', 'Event plan saved.');
    }

    public function updateEvent(Request $request, AssociationEvent $event)
    {
        $data = $this->validateEvent($request, updating: true);
        $event->update($this->eventAttributes($request, $data, $event));
        if ($request->has('committee') || $request->has('committee_ids')) {
            $this->syncCommittee($event, $data['committee'] ?? [], $data['committee_ids'] ?? []);
        }
        if ($request->has('budget_items')) {
            $this->syncBudgetItems($event, $data['budget_items'] ?? []);
        }
        $event->update(['total_budget' => $event->fresh('budgetItems')->grand_total]);

        return back()->with('success', 'Event plan updated.');
    }

    public function destroyEvent(AssociationEvent $event)
    {
        $event->delete();

        return back()->with('success', 'Event removed.');
    }

    public function showEventDocument(AssociationEvent $event, string $document)
    {
        return $this->renderEventDocument($event, $document, download: false);
    }

    public function downloadEventDocument(AssociationEvent $event, string $document)
    {
        return $this->renderEventDocument($event, $document, download: true);
    }

    public function storePurchaseRequest(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'purpose' => ['nullable', 'string', 'max:4000'],
            'amount' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', Rule::in(array_keys(AssociationMoney::CURRENCIES))],
            'payment_method' => ['nullable', 'string', Rule::in(array_keys(AssociationMoney::PAYMENT_METHODS))],
            'items' => ['nullable', 'array'],
            'items.*.description' => ['required_with:items', 'string', 'max:255'],
            'items.*.quantity' => ['nullable', 'integer', 'min:1'],
            'items.*.unit_cost' => ['nullable', 'numeric', 'min:0'],
            'event_id' => ['nullable', 'integer', 'exists:association_events,id'],
        ]);

        $items = $data['items'] ?? [];
        $amount = $data['amount'] ?? collect($items)->sum(fn ($item) => ((int) ($item['quantity'] ?? 1)) * ((float) ($item['unit_cost'] ?? 0)));
        $currency = AssociationMoney::currency($data['currency'] ?? 'SSP');
        $departmentId = $request->user()?->department_id;
        $hold = AssociationAms::evaluateHold($departmentId, (float) $amount, $currency);

        $order = PurchaseRequest::query()->create([
            'title' => $data['title'],
            'purpose' => $data['purpose'] ?? null,
            'amount' => $amount,
            'currency' => $currency,
            'payment_method' => AssociationMoney::paymentMethod($data['payment_method'] ?? 'cash'),
            'status' => PurchaseRequest::STATUS_SUBMITTED,
            'department_id' => $departmentId,
            'event_id' => $data['event_id'] ?? null,
            'requested_by' => $request->user()?->id,
            'budget_hold' => $hold['hold'],
            'hold_reason' => $hold['reason'],
        ]);

        foreach ($items as $item) {
            $order->items()->create([
                'description' => $item['description'],
                'quantity' => $item['quantity'] ?? 1,
                'unit_cost' => $item['unit_cost'] ?? 0,
            ]);
        }

        $message = $hold['hold']
            ? 'Purchase request submitted but placed on automatic budget hold. Finance must release it before review.'
            : 'Purchase request submitted for review.';

        return back()->with($hold['hold'] ? 'error' : 'success', $message);
    }

    public function reviewPurchaseRequest(Request $request, PurchaseRequest $purchaseRequest)
    {
        abort_unless($request->user()?->canReviewPurchaseOrders(), 403);
        if ($purchaseRequest->budget_hold) {
            return back()->with('error', 'This requisition is on automatic budget hold until Finance releases the remaining allocation.');
        }

        $data = $request->validate([
            'decision' => ['required', Rule::in(['reviewed', 'rejected'])],
            'review_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $purchaseRequest->update([
            'status' => $data['decision'] === 'rejected' ? PurchaseRequest::STATUS_REJECTED : PurchaseRequest::STATUS_REVIEWED,
            'reviewed_by' => $request->user()?->id,
            'reviewed_at' => now(),
            'review_notes' => $data['review_notes'] ?? null,
        ]);

        return back()->with('success', $data['decision'] === 'rejected' ? 'Purchase request rejected.' : 'Purchase request reviewed.');
    }

    public function releasePurchaseRequestHold(Request $request, PurchaseRequest $purchaseRequest)
    {
        abort_unless($request->user()?->canReleaseBudgetHold(), 403);

        $purchaseRequest->update([
            'budget_hold' => false,
            'hold_reason' => null,
        ]);

        return back()->with('success', 'Budget hold released. The requisition can now be reviewed.');
    }

    public function approvePurchaseRequest(Request $request, PurchaseRequest $purchaseRequest)
    {
        abort_unless($request->user()?->canApprovePurchaseOrders(), 403);
        abort_unless($purchaseRequest->status === PurchaseRequest::STATUS_REVIEWED, 422, 'The Secretary General must review this request first.');
        if ($purchaseRequest->budget_hold) {
            return back()->with('error', 'This requisition is on automatic budget hold.');
        }

        $purchaseRequest->update([
            'status' => PurchaseRequest::STATUS_APPROVED,
            'approved_by' => $request->user()?->id,
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Purchase request approved.');
    }

    public function payPurchaseRequest(Request $request, PurchaseRequest $purchaseRequest)
    {
        abort_unless($request->user()?->canReleasePayment(), 403);
        abort_unless($purchaseRequest->status === PurchaseRequest::STATUS_APPROVED, 422, 'The Chairman must approve this request before payment.');

        $purchaseRequest->update([
            'status' => PurchaseRequest::STATUS_PAID,
            'paid_by' => $request->user()?->id,
            'paid_at' => now(),
        ]);

        OperationsExpense::fromPurchaseRequest($purchaseRequest->fresh('items'));

        return back()->with('success', 'Payment released and recorded as an expense.');
    }

    public function storeReceipt(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'vendor' => ['nullable', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', Rule::in(array_keys(AssociationMoney::CURRENCIES))],
            'payment_method' => ['nullable', 'string', Rule::in(array_keys(AssociationMoney::PAYMENT_METHODS))],
            'notes' => ['nullable', 'string', 'max:2000'],
            'purchase_request_id' => ['nullable', 'integer', 'exists:purchase_requests,id'],
            'received_on' => ['nullable', 'date'],
            'file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf,doc,docx', 'max:10240'],
        ]);

        $file = $this->storeUpload($request->file('file'), 'operations/receipts');

        $receipt = AssociationReceipt::query()->create([
            'title' => $data['title'],
            'vendor' => $data['vendor'] ?? null,
            'amount' => $data['amount'],
            'currency' => AssociationMoney::currency($data['currency'] ?? 'SSP'),
            'payment_method' => AssociationMoney::paymentMethod($data['payment_method'] ?? 'cash'),
            'notes' => $data['notes'] ?? null,
            'purchase_request_id' => $data['purchase_request_id'] ?? null,
            'received_on' => $data['received_on'] ?? now()->toDateString(),
            'file_path' => $file['path'],
            'file_name' => $file['name'],
            'department_id' => $request->user()?->department_id,
            'recorded_by' => $request->user()?->id,
        ]);

        OperationsExpense::fromReceipt($receipt->load('purchaseRequest'));

        return back()->with('success', 'Receipt stored.');
    }

    public function showReceipt(AssociationReceipt $receipt)
    {
        return $this->renderReceipt($receipt, download: false);
    }

    public function downloadReceipt(AssociationReceipt $receipt)
    {
        return $this->renderReceipt($receipt, download: true);
    }

    public function storeLogistics(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'kind' => ['required', Rule::in(array_keys(LogisticsDocument::KINDS))],
            'document_date' => ['nullable', 'date'],
            'vendor' => ['nullable', 'string', 'max:255'],
            'party_from' => ['nullable', 'string', 'max:255'],
            'party_to' => ['nullable', 'string', 'max:255'],
            'amount' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', Rule::in(array_keys(AssociationMoney::CURRENCIES))],
            'notes' => ['nullable', 'string', 'max:2000'],
            'purchase_request_id' => ['nullable', 'integer', 'exists:purchase_requests,id'],
            'items' => ['nullable', 'array'],
            'items.*.description' => ['required_with:items', 'string', 'max:255'],
            'items.*.quantity' => ['nullable', 'numeric', 'min:0'],
            'items.*.unit' => ['nullable', 'string', 'max:40'],
            'items.*.unit_cost' => ['nullable', 'numeric', 'min:0'],
            'details' => ['nullable', 'array'],
            'details.vehicle_reg' => ['nullable', 'string', 'max:80'],
            'details.driver_name' => ['nullable', 'string', 'max:255'],
            'details.origin' => ['nullable', 'string', 'max:255'],
            'details.destination' => ['nullable', 'string', 'max:255'],
            'details.valid_until' => ['nullable', 'date'],
            'details.payment_terms' => ['nullable', 'string', 'max:255'],
            'details.payment_method' => ['nullable', 'string', Rule::in(array_keys(AssociationMoney::PAYMENT_METHODS))],
            'details.bank_details' => ['nullable', 'string', 'max:500'],
            'details.delivery_address' => ['nullable', 'string', 'max:255'],
            'details.expected_delivery' => ['nullable', 'date'],
            'details.received_by' => ['nullable', 'string', 'max:255'],
            'details.condition' => ['nullable', 'string', 'max:255'],
            'file' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf,doc,docx', 'max:10240'],
        ]);

        $file = $this->storeUpload($request->file('file'), 'operations/logistics');
        $items = collect($data['items'] ?? [])->filter(fn ($item) => filled($item['description'] ?? null))->values()->all();
        $amount = $data['amount'] ?? collect($items)->sum(fn ($item) => ((float) ($item['quantity'] ?? 1)) * ((float) ($item['unit_cost'] ?? 0)));

        $document = LogisticsDocument::query()->create([
            'title' => $data['title'],
            'kind' => $data['kind'],
            'document_date' => $data['document_date'] ?? now()->toDateString(),
            'vendor' => $data['vendor'] ?? null,
            'party_from' => $data['party_from'] ?? 'Luac Akook Yieu Youth Association',
            'party_to' => $data['party_to'] ?? null,
            'amount' => $amount,
            'currency' => AssociationMoney::currency($data['currency'] ?? 'SSP'),
            'items' => $items,
            'details' => array_merge(
                ['payment_method' => 'cash'],
                $data['details'] ?? [],
            ),
            'notes' => $data['notes'] ?? null,
            'file_path' => $file['path'],
            'file_name' => $file['name'],
            'purchase_request_id' => $data['purchase_request_id'] ?? null,
            'department_id' => $request->user()?->department_id,
            'uploaded_by' => $request->user()?->id,
        ]);

        OperationsExpense::fromLogistics($document);

        return back()->with('success', 'Logistics document prepared.');
    }

    public function showLogistics(LogisticsDocument $logistics)
    {
        return $this->renderLogisticsDocument($logistics, download: false);
    }

    public function downloadLogistics(LogisticsDocument $logistics)
    {
        return $this->renderLogisticsDocument($logistics, download: true);
    }

    public function showPurchaseRequest(PurchaseRequest $purchaseRequest)
    {
        return $this->renderPurchaseRequest($purchaseRequest, download: false);
    }

    public function downloadPurchaseRequest(PurchaseRequest $purchaseRequest)
    {
        return $this->renderPurchaseRequest($purchaseRequest, download: true);
    }

    private function expirePastMeetings(): void
    {
        if (! Schema::hasTable('association_meetings')) {
            return;
        }

        AssociationMeeting::query()
            ->where('status', 'scheduled')
            ->whereDate('starts_at', '<', now()->toDateString())
            ->update(['status' => 'completed']);
    }

    private function scopeDepartment(Builder $query, ?User $user): void
    {
        if (! $user || $user->isChairman() || $user->isSecretaryGeneral() || $user->isDeputyChairman() || $user->isFinanceOfficer()) {
            return;
        }

        if ($user->department_id && $query->getModel()->isFillable('department_id')) {
            $query->where('department_id', $user->department_id);
        }
    }

    /**
     * @param  list<array<string, mixed>>  $items
     */
    private function syncBudgetItems(AssociationEvent $event, array $items): void
    {
        $event->budgetItems()->delete();
        foreach ($items as $item) {
            if (! filled($item['category'] ?? null)) {
                continue;
            }
            $quantity = $item['quantity'] ?? null;
            $unitCost = $item['unit_cost'] ?? null;
            $computed = ((float) ($quantity ?: 0)) * ((float) ($unitCost ?: 0));
            $amount = $computed > 0 ? $computed : (float) ($item['amount'] ?? 0);
            $event->budgetItems()->create([
                'category' => $item['category'],
                'elements' => $item['elements'] ?? null,
                'unit_metric' => $item['unit_metric'] ?? null,
                'quantity' => $quantity ?: null,
                'unit_cost' => $unitCost ?: null,
                'amount' => $amount ?: 0,
                'notes' => $item['notes'] ?? null,
            ]);
        }
    }

    /**
     * @param  list<array{role?: string, user_id?: mixed}>  $committee
     * @param  list<int|string>  $legacyIds
     */
    private function syncCommittee(AssociationEvent $event, array $committee, array $legacyIds = []): void
    {
        $sync = [];
        foreach ($committee as $row) {
            $userId = (int) ($row['user_id'] ?? 0);
            $role = (string) ($row['role'] ?? '');
            if ($userId && array_key_exists($role, EventPlanning::COMMITTEE_ROLES)) {
                $sync[$userId] = ['role' => $role];
            }
        }
        if ($sync === [] && $legacyIds !== []) {
            foreach ($legacyIds as $id) {
                $sync[(int) $id] = ['role' => 'event_director'];
            }
        }
        $event->committee()->sync($sync);
    }

    private function validateReport(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:80'],
            'summary' => ['required', 'string', 'max:8000'],
            'body' => ['nullable', 'string', 'max:20000'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'kind' => ['nullable', Rule::in(['departmental', 'association'])],
            'template' => ['nullable', Rule::in(array_keys(DepartmentalReport::KINDS))],
            'department_id' => [$this->lockedDepartmentId($request->user()) ? 'nullable' : 'required', 'integer', 'exists:departments,id'],
            'submitted_on' => ['nullable', 'date'],
            'is_public' => ['sometimes', 'boolean'],
            'document' => ['nullable', 'file', 'mimes:doc,docx,pdf', 'max:10240'],
            'payload' => ['nullable', 'array'],
            'payload.submitted_to' => ['nullable', 'string', 'max:255'],
            'payload.submitted_by' => ['nullable', 'string', 'max:255'],
            'payload.prepared_by' => ['nullable', 'string', 'max:255'],
            'payload.purpose' => ['nullable', 'string', 'max:8000'],
            'payload.objectives' => ['nullable', 'string', 'max:8000'],
            'payload.highlights' => ['nullable', 'string', 'max:8000'],
            'payload.financial_update' => ['nullable', 'string', 'max:8000'],
            'payload.challenges' => ['nullable', 'string', 'max:8000'],
            'payload.next_priorities' => ['nullable', 'string', 'max:8000'],
            'payload.recommendations' => ['nullable', 'string', 'max:8000'],
            'payload.conclusion' => ['nullable', 'string', 'max:8000'],
            'payload.reviewed_by' => ['nullable', 'string', 'max:255'],
            'payload.approved_by' => ['nullable', 'string', 'max:255'],
            'payload.approved_on' => ['nullable', 'string', 'max:80'],
            'payload.submitted_on' => ['nullable', 'string', 'max:80'],
            'payload.attachment_title' => ['nullable', 'string', 'max:255'],
            'payload.attachment_note' => ['nullable', 'string', 'max:4000'],
            'payload.metrics' => ['nullable', 'array'],
            'payload.metrics.*.metric' => ['nullable', 'string', 'max:255'],
            'payload.metrics.*.status' => ['nullable', 'string', 'max:1000'],
            'payload.risks' => ['nullable', 'array'],
            'payload.risks.*.risk' => ['nullable', 'string', 'max:500'],
            'payload.risks.*.effect' => ['nullable', 'string', 'max:500'],
            'payload.risks.*.mitigation' => ['nullable', 'string', 'max:1000'],
            'payload.actions' => ['nullable', 'array'],
            'payload.actions.*.item' => ['nullable', 'string', 'max:500'],
            'payload.actions.*.office' => ['nullable', 'string', 'max:255'],
            'payload.actions.*.status' => ['nullable', 'string', 'max:80'],
            'payload.attachment_columns' => ['nullable', 'array'],
            'payload.attachment_columns.*' => ['nullable', 'string', 'max:80'],
            'payload.attachment_rows' => ['nullable', 'array'],
            'payload.cc' => ['nullable', 'array'],
            'payload.cc.*' => ['nullable', 'string', 'max:255'],
        ]);
    }

    /**
     * @param  array<string, mixed>  $data
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private function reportAttributes(Request $request, array $data, array $payload, bool $canPublish, ?AssociationReport $report = null): array
    {
        $locked = $this->lockedDepartmentId($request->user());

        return [
            'title' => $data['title'],
            'period' => $data['period'] ?? null,
            'summary' => $data['summary'],
            'body' => $data['body'] ?? $report?->body,
            'template' => $data['template'] ?? $report?->template ?? 'monthly',
            'context' => $payload['purpose'] ?: ($data['context'] ?? $report?->context),
            'deliverables' => $payload['highlights'] ?: ($data['deliverables'] ?? $report?->deliverables),
            'challenges' => $payload['challenges'] ?: ($data['challenges'] ?? $report?->challenges),
            'financial_summary' => $payload['financial_update'] ?: ($data['financial_summary'] ?? $report?->financial_summary),
            'payload' => $payload,
            'submitted_on' => $data['submitted_on'] ?? $payload['submitted_on'] ?? $report?->submitted_on,
            'status' => $data['status'],
            'kind' => $data['kind'] ?? $report?->kind ?? 'departmental',
            'is_public' => $canPublish ? (bool) ($data['is_public'] ?? false) : (bool) ($report?->is_public ?? false),
            'approval_status' => $canPublish && ($data['is_public'] ?? false) ? 'approved' : ($report?->approval_status ?? 'pending'),
            'department_id' => $locked ?: ($data['department_id'] ?? $report?->department_id ?? $request->user()?->department_id),
        ];
    }

    private function lockedDepartmentId(?User $user): ?int
    {
        if (! $user || $user->isChairman() || $user->isDeputyChairman() || $user->isSecretaryGeneral() || $user->isFinanceOfficer() || $user->isAdmin()) {
            return null;
        }

        return $user->department_id ? (int) $user->department_id : null;
    }

    private function renderDepartmentalReport(AssociationReport $report, bool $download)
    {
        $report->load(['author:id,name', 'department:id,name,code', 'approver:id,name']);

        $html = view('operations.documents.departmental-report', [
            'org' => $this->letterhead(),
            'report' => $report,
            'download' => $download,
        ])->render();

        return $this->documentResponse($html, $report->reference.'.html', $download);
    }

    private function validateEvent(Request $request, bool $updating = false): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'kind' => ['nullable', Rule::in(array_keys(EventPlanning::KINDS))],
            'event_date' => ['nullable', 'date'],
            'ends_on' => ['nullable', 'date'],
            'venue' => ['nullable', 'string', 'max:255'],
            'objectives' => ['nullable', 'string', 'max:4000'],
            'kpis' => ['nullable', 'string', 'max:4000'],
            'audience' => ['nullable', 'string', 'max:2000'],
            'total_budget' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', Rule::in(array_keys(AssociationMoney::CURRENCIES))],
            'contingency_percent' => ['nullable', 'integer', 'min:10', 'max:15'],
            'program_outline' => ['nullable', 'string', 'max:8000'],
            'notes' => ['nullable', 'string', 'max:4000'],
            'status' => [$updating ? 'nullable' : 'sometimes', Rule::in(array_keys(EventPlanning::PHASES))],
            'committee_ids' => ['nullable', 'array'],
            'committee_ids.*' => ['integer', 'exists:users,id'],
            'committee' => ['nullable', 'array'],
            'committee.*.role' => ['nullable', Rule::in(array_keys(EventPlanning::COMMITTEE_ROLES))],
            'committee.*.user_id' => ['nullable', 'integer', 'exists:users,id'],
            'budget_items' => ['nullable', 'array'],
            'budget_items.*.category' => ['required_with:budget_items', 'string', 'max:120'],
            'budget_items.*.elements' => ['nullable', 'string', 'max:500'],
            'budget_items.*.unit_metric' => ['nullable', 'string', 'max:120'],
            'budget_items.*.quantity' => ['nullable', 'numeric', 'min:0'],
            'budget_items.*.unit_cost' => ['nullable', 'numeric', 'min:0'],
            'budget_items.*.amount' => ['nullable', 'numeric', 'min:0'],
            'budget_items.*.notes' => ['nullable', 'string', 'max:255'],
            'plan' => ['nullable', 'array'],
            'plan.kind_notes' => ['nullable', 'string', 'max:4000'],
            'plan.speaker_briefing' => ['nullable', 'string', 'max:4000'],
            'plan.confirmation_notes' => ['nullable', 'string', 'max:4000'],
            'plan.dress_code' => ['nullable', 'string', 'max:255'],
            'plan.pre_reading' => ['nullable', 'string', 'max:4000'],
            'plan.setup_notes' => ['nullable', 'string', 'max:4000'],
            'plan.registration_desks' => ['nullable', 'string', 'max:500'],
            'plan.protocol_notes' => ['nullable', 'string', 'max:4000'],
            'plan.troubleshooting' => ['nullable', 'string', 'max:4000'],
            'plan.inventory_notes' => ['nullable', 'string', 'max:4000'],
            'plan.agenda' => ['nullable', 'array'],
            'plan.agenda.*.time' => ['nullable', 'string', 'max:80'],
            'plan.agenda.*.item' => ['nullable', 'string', 'max:255'],
            'plan.agenda.*.owner' => ['nullable', 'string', 'max:255'],
            'plan.agenda.*.notes' => ['nullable', 'string', 'max:500'],
            'plan.vendors' => ['nullable', 'array'],
            'plan.vendors.*.service' => ['nullable', 'string', 'max:255'],
            'plan.vendors.*.vendor' => ['nullable', 'string', 'max:255'],
            'plan.vendors.*.specs' => ['nullable', 'string', 'max:2000'],
            'plan.vendors.*.status' => ['nullable', 'string', 'max:40'],
            'plan.report' => ['nullable', 'array'],
            'plan.report.executive_summary' => ['nullable', 'string', 'max:8000'],
            'plan.report.achievements' => ['nullable', 'string', 'max:8000'],
            'plan.report.demographics' => ['nullable', 'string', 'max:4000'],
            'plan.report.feedback' => ['nullable', 'string', 'max:4000'],
            'plan.report.media' => ['nullable', 'string', 'max:4000'],
            'plan.report.recommendations' => ['nullable', 'string', 'max:4000'],
            'plan.report.actual_spend' => ['nullable', 'string', 'max:80'],
            'plan.report.ticket_revenue' => ['nullable', 'numeric', 'min:0'],
            'plan.report.attendance_count' => ['nullable', 'integer', 'min:0'],
            'ticket_revenue' => ['nullable', 'numeric', 'min:0'],
            'attendance_count' => ['nullable', 'integer', 'min:0'],
        ]);
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function eventAttributes(Request $request, array $data, ?AssociationEvent $event = null): array
    {
        $plan = array_replace_recursive(
            $event?->planData() ?? EventPlanning::emptyPlan(),
            $data['plan'] ?? [],
        );

        return [
            'title' => $data['title'],
            'kind' => $data['kind'] ?? $event?->kind ?? 'workshop',
            'event_date' => $data['event_date'] ?? null,
            'ends_on' => $data['ends_on'] ?? null,
            'venue' => $data['venue'] ?? null,
            'objectives' => $data['objectives'] ?? null,
            'kpis' => $data['kpis'] ?? null,
            'audience' => $data['audience'] ?? null,
            'currency' => AssociationMoney::currency($data['currency'] ?? $event?->currency ?? 'SSP'),
            'contingency_percent' => $data['contingency_percent'] ?? $event?->contingency_percent ?? 12,
            'program_outline' => $data['program_outline'] ?? null,
            'notes' => $data['notes'] ?? null,
            'plan' => $plan,
            'status' => $data['status'] ?? $event?->status ?? 'planning',
            'ticket_revenue' => $data['ticket_revenue'] ?? data_get($plan, 'report.ticket_revenue') ?? $event?->ticket_revenue ?? 0,
            'attendance_count' => $data['attendance_count'] ?? data_get($plan, 'report.attendance_count') ?? $event?->attendance_count,
            'department_id' => $event?->department_id ?? $request->user()?->department_id,
            'created_by' => $event?->created_by ?? $request->user()?->id,
        ];
    }

    private function renderEventDocument(AssociationEvent $event, string $document, bool $download)
    {
        abort_unless(array_key_exists($document, EventPlanning::DOCUMENTS), 404);

        $event->load(['creator:id,name', 'department:id,name', 'budgetItems', 'committee:id,name', 'tasks.assignee:id,name']);

        $html = view('operations.documents.event', [
            'org' => $this->letterhead(),
            'event' => $event,
            'plan' => $event->planData(),
            'document' => $document,
            'label' => EventPlanning::DOCUMENTS[$document],
            'download' => $download,
        ])->render();

        return $this->documentResponse($html, $event->reference.'-'.$document.'.html', $download);
    }

    /**
     * @return array{path: ?string, name: ?string}
     */
    private function storeUpload(?UploadedFile $file, string $folder): array
    {
        if (! $file) {
            return ['path' => null, 'name' => null];
        }

        return [
            'path' => $file->store($folder, 'public'),
            'name' => $file->getClientOriginalName(),
        ];
    }

    private function renderLogisticsDocument(LogisticsDocument $document, bool $download)
    {
        $document->load(['uploader:id,name', 'department:id,name', 'purchaseRequest.items']);

        $html = view('operations.documents.logistics', [
            'org' => $this->letterhead(),
            'document' => $document,
            'download' => $download,
        ])->render();

        $filename = $document->reference.'.html';

        return $this->documentResponse($html, $filename, $download);
    }

    private function renderPurchaseRequest(PurchaseRequest $purchaseRequest, bool $download)
    {
        $purchaseRequest->load(['requester:id,name', 'reviewer:id,name', 'approver:id,name', 'payer:id,name', 'department:id,name', 'items']);

        $html = view('operations.documents.purchase-request', [
            'org' => $this->letterhead(),
            'order' => $purchaseRequest,
            'download' => $download,
        ])->render();

        return $this->documentResponse($html, $purchaseRequest->reference.'.html', $download);
    }

    private function renderReceipt(AssociationReceipt $receipt, bool $download)
    {
        $receipt->load(['recorder:id,name', 'department:id,name', 'purchaseRequest']);

        $html = view('operations.documents.receipt', [
            'org' => $this->letterhead(),
            'receipt' => $receipt,
            'download' => $download,
        ])->render();

        return $this->documentResponse($html, $receipt->reference.'.html', $download);
    }

    private function letterhead(): array
    {
        $org = AssociationLetterhead::data();
        if (is_file($org['logo'])) {
            $org['logoUrl'] = 'data:image/jpeg;base64,'.base64_encode((string) file_get_contents($org['logo']));
        } else {
            $org['logoUrl'] = null;
        }

        return $org;
    }

    private function documentResponse(string $html, string $filename, bool $download)
    {
        $response = response($html, 200, [
            'Content-Type' => 'text/html; charset=UTF-8',
        ]);

        if ($download) {
            $response->header('Content-Disposition', 'attachment; filename="'.$filename.'"');
        }

        return $response;
    }
}
