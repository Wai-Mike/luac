@extends('operations.documents.layout')

@php
    $roles = \App\Support\EventPlanning::COMMITTEE_ROLES;
    $kindFocus = \App\Support\EventPlanning::KIND_FOCUS[$event->kind] ?? '';
    $committeeByRole = $event->committee->keyBy(fn ($user) => $user->pivot->role);
    $agenda = collect($plan['agenda'] ?? [])->filter(fn ($row) => filled($row['item'] ?? null) || filled($row['time'] ?? null));
    $vendors = collect($plan['vendors'] ?? [])->filter(fn ($row) => filled($row['service'] ?? null) || filled($row['vendor'] ?? null));
    $report = $plan['report'] ?? [];
    $dates = trim(implode(' – ', array_filter([
        optional($event->event_date)->format('d M Y'),
        optional($event->ends_on)->format('d M Y'),
    ]))) ?: 'Date TBC';
@endphp

@section('title', $label)
@section('paperType', in_array($document, ['brief', 'confirmation', 'evaluation', 'report'], true) ? 'report' : 'ops')
@section('downloadUrl', route('admin.operations.events.documents.download', [$event, $document]))

@section('body')
    <div class="meta">
        <div><strong>Reference</strong><span class="ref">{{ $event->reference }}</span></div>
        <div><strong>Event</strong>{{ $event->title }}</div>
        <div><strong>Type</strong>{{ $event->kind_label }}</div>
        <div><strong>Phase</strong>{{ $event->phase_label }}</div>
        <div><strong>Dates</strong>{{ $dates }}</div>
        <div><strong>Venue</strong>{{ $event->venue ?: 'TBC' }}</div>
        <div><strong>Department</strong>{{ $event->department?->name ?: 'Association' }}</div>
        <div><strong>Prepared by</strong>{{ $event->creator?->name ?: 'Operations' }}</div>
    </div>

    @if($document === 'brief')
        <div class="notes"><strong>Objectives</strong><br>{{ $event->objectives ?: 'To be confirmed by the Event Director.' }}</div>
        <p></p>
        <div class="notes"><strong>Target audience</strong><br>{{ $event->audience ?: 'Government officials, partners, youth delegates, and community members as assigned.' }}</div>
        <p></p>
        <div class="notes"><strong>Key performance indicators</strong><br>{{ $event->kpis ?: 'Attendance, learning outcomes, and press coverage to be set by the steering committee.' }}</div>
        <p></p>
        <div class="notes"><strong>Event-type requirements</strong><br>{{ $kindFocus }} {{ $plan['kind_notes'] ?? '' }}</div>
        @if($event->program_outline)
            <p></p>
            <div class="notes"><strong>Concept notes</strong><br>{{ $event->program_outline }}</div>
        @endif
    @endif

    @if($document === 'committee')
        <table>
            <thead>
                <tr>
                    <th>Role</th>
                    <th>Assigned to</th>
                    <th>Mandate</th>
                </tr>
            </thead>
            <tbody>
                @foreach($roles as $role => $title)
                    <tr>
                        <td>{{ $title }}</td>
                        <td>{{ $committeeByRole[$role]->name ?? 'Vacant — assign before execution' }}</td>
                        <td>
                            @if($role === 'event_director') Oversees overall strategy and execution.
                            @elseif($role === 'logistics_procurement') Handles venues, vendors, materials, and contracts.
                            @elseif($role === 'finance') Manages budget, disbursements, and receipts.
                            @elseif($role === 'protocol_comms') Manages invitations, VIP protocol, media, and branding.
                            @else Manages agendas, speakers, facilitators, and training modules.
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        @if($event->tasks->isNotEmpty())
            <p class="quiet">Tracked tasks</p>
            <table>
                <thead><tr><th>Task</th><th>Owner</th><th>Due</th><th>Priority</th></tr></thead>
                <tbody>
                    @foreach($event->tasks as $task)
                        <tr>
                            <td>{{ $task->title }}</td>
                            <td>{{ $task->assignee?->name ?: 'Unassigned' }}</td>
                            <td>{{ $task->due_on ?: '—' }}</td>
                            <td>{{ ucfirst($task->priority) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    @endif

    @if($document === 'budget')
        <table>
            <thead>
                <tr>
                    <th>Expense category</th>
                    <th>Itemized elements</th>
                    <th>Pricing unit</th>
                    <th class="num">Qty</th>
                    <th class="num">Unit cost</th>
                    <th class="num">Amount</th>
                </tr>
            </thead>
            <tbody>
                @forelse($event->budgetItems as $item)
                    <tr>
                        <td>{{ $item->category }}</td>
                        <td>{{ $item->elements }}</td>
                        <td>{{ $item->unit_metric }}</td>
                        <td class="num">{{ $item->quantity !== null ? rtrim(rtrim(number_format((float) $item->quantity, 2), '0'), '.') : '—' }}</td>
                        <td class="num">{{ $item->unit_cost !== null ? number_format((float) $item->unit_cost, 2) : '—' }}</td>
                        <td class="num">{{ number_format($item->lineTotal(), 2) }}</td>
                    </tr>
                @empty
                    <tr><td colspan="6">No budget lines yet. Complete the budgeting phase before printing.</td></tr>
                @endforelse
            </tbody>
        </table>
        <p class="total">Subtotal: {{ $event->currency_label }} {{ number_format($event->budget_subtotal, 2) }}</p>
        <p class="total">Contingency ({{ $event->contingency_percent }}%): {{ $event->currency_label }} {{ number_format($event->contingency_amount, 2) }}</p>
        <p class="total">Grand total: {{ $event->currency_label }} {{ number_format($event->grand_total, 2) }}</p>
        <p class="quiet">A 10–15% contingency is required. This paper uses {{ $event->contingency_percent }}%.</p>
    @endif

    @if($document === 'tor')
        <div class="notes"><strong>Procurement method</strong><br>Adhere to LAYYA procurement: Terms of Reference, competitive bidding, contracting, then quality inspection 24–48 hours before the event.</div>
        <table>
            <thead>
                <tr>
                    <th>Service</th>
                    <th>Vendor</th>
                    <th>Specifications</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @forelse($vendors as $vendor)
                    <tr>
                        <td>{{ $vendor['service'] ?? '—' }}</td>
                        <td>{{ $vendor['vendor'] ?? 'To be sourced' }}</td>
                        <td>{{ $vendor['specs'] ?? '—' }}</td>
                        <td>{{ ucfirst(str_replace('_', ' ', $vendor['status'] ?? 'sourcing')) }}</td>
                    </tr>
                @empty
                    <tr><td colspan="4">Add vendor specifications (menu options, AV output, print resolution) before circulating this ToR.</td></tr>
                @endforelse
            </tbody>
        </table>
        <div class="notes">
            <strong>Required steps</strong><br>
            1. Develop Terms of Reference and exact specifications before contacting suppliers.<br>
            2. Source at least three comparable bids.<br>
            3. Sign a binding agreement with payment terms.<br>
            4. Inspect samples and venue systems 24–48 hours before the event.
        </div>
    @endif

    @if($document === 'agenda')
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Session / item</th>
                    <th>Owner</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                @forelse($agenda as $row)
                    <tr>
                        <td>{{ $row['time'] ?? '—' }}</td>
                        <td>{{ $row['item'] ?? '—' }}</td>
                        <td>{{ $row['owner'] ?? '—' }}</td>
                        <td>{{ $row['notes'] ?? '' }}</td>
                    </tr>
                @empty
                    <tr><td colspan="4">Build the minute-by-minute run-of-show before briefing speakers.</td></tr>
                @endforelse
            </tbody>
        </table>
        @if(! empty($plan['speaker_briefing']))
            <div class="notes"><strong>Speaker and facilitator briefing</strong><br>{{ $plan['speaker_briefing'] }}</div>
        @endif
        <div class="flow">
            <div>1. Pre-event setup (T-1)</div>
            <div>2. Guest registration (T-0)</div>
            <div>3. Opening and protocol flow</div>
            <div>4. Technical / content flow</div>
            <div>5. Closing and certificates</div>
        </div>
    @endif

    @if($document === 'confirmation')
        <p>Dear participant,</p>
        <p>You are confirmed for <strong>{{ $event->title }}</strong>, a {{ strtolower($event->kind_label) }} of the Luac Akook Yieu Youth Association.</p>
        <div class="meta">
            <div><strong>When</strong>{{ $dates }}</div>
            <div><strong>Where</strong>{{ $event->venue ?: 'Venue to be advised' }}</div>
            <div><strong>Dress code</strong>{{ $plan['dress_code'] ?: 'Formal / smart association dress' }}</div>
            <div><strong>Audience</strong>{{ $event->audience ?: 'Invited delegates' }}</div>
        </div>
        @if(! empty($plan['confirmation_notes']))
            <div class="notes"><strong>Logistical notes</strong><br>{{ $plan['confirmation_notes'] }}</div>
        @endif
        @if(! empty($plan['pre_reading']))
            <p></p>
            <div class="notes"><strong>Pre-event reading / baseline</strong><br>{{ $plan['pre_reading'] }}</div>
        @endif
        <p>Please arrive 30 minutes before the opening for registration. Bring this letter and a form of identification.</p>
        <div class="signs">
            <div class="sign">Protocol &amp; Communications Lead<br>{{ $committeeByRole['protocol_comms']->name ?? '' }}</div>
            <div class="sign">Event Director<br>{{ $committeeByRole['event_director']->name ?? '' }}</div>
        </div>
    @endif

    @if($document === 'register')
        <p class="quiet">Desks: {{ $plan['registration_desks'] ?: 'VIPs, General Delegates, Media, Facilitators' }}</p>
        <table>
            <thead>
                <tr>
                    <th class="num">#</th>
                    <th>Full name</th>
                    <th>Organisation</th>
                    <th>Category</th>
                    <th>Gender</th>
                    <th>Signature</th>
                    <th>Kit issued</th>
                </tr>
            </thead>
            <tbody>
                @for($i = 1; $i <= 18; $i++)
                    <tr>
                        <td class="num">{{ $i }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                @endfor
            </tbody>
        </table>
        @if(! empty($plan['setup_notes']))
            <div class="notes"><strong>D-1 / D-0 operations notes</strong><br>{{ $plan['setup_notes'] }}</div>
        @endif
        @if(! empty($plan['protocol_notes']))
            <p></p>
            <div class="notes"><strong>Protocol and seating</strong><br>{{ $plan['protocol_notes'] }}</div>
        @endif
    @endif

    @if($document === 'evaluation')
        <p class="quiet">Please rate each item from 1 (poor) to 5 (excellent).</p>
        <table>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                </tr>
            </thead>
            <tbody>
                @foreach(['Overall satisfaction', 'Relevance of content', 'Quality of facilitation', 'Venue and facilities', 'Catering and logistics', 'Would recommend this event'] as $question)
                    <tr>
                        <td>{{ $question }}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <div class="notes"><strong>What worked well?</strong><br><br><br></div>
        <p></p>
        <div class="notes"><strong>What should improve next time?</strong><br><br><br></div>
        <p class="quiet">Name (optional) ______________________ &nbsp; Organisation ______________________</p>
    @endif

    @if($document === 'report')
        <div class="notes"><strong>Executive summary and background</strong><br>{{ $report['executive_summary'] ?: ($event->objectives ?: 'Complete this section after the event.') }}</div>
        <p></p>
        <div class="notes"><strong>Key achievements and session summaries</strong><br>{{ $report['achievements'] ?: '—' }}</div>
        <p></p>
        <div class="notes"><strong>Participant breakdown (gender / organisation)</strong><br>{{ $report['demographics'] ?: '—' }}</div>
        <p></p>
        <div class="notes"><strong>Feedback analysis</strong><br>{{ $report['feedback'] ?: '—' }}</div>
        <p></p>
        <div class="notes"><strong>Photo gallery and media links</strong><br>{{ $report['media'] ?: '—' }}</div>
        <p></p>
        <div class="notes"><strong>Financial summary versus budget</strong><br>
            Budgeted: {{ $event->currency_label }} {{ number_format($event->grand_total, 2) }}<br>
            Actual spend: {{ $report['actual_spend'] ?: 'To be reconciled with receipts and invoices' }}
        </div>
        <p></p>
        <div class="notes"><strong>Recommendations</strong><br>{{ $report['recommendations'] ?: '—' }}</div>
        @if(! empty($plan['inventory_notes']))
            <p></p>
            <div class="notes"><strong>Breakdown and inventory</strong><br>{{ $plan['inventory_notes'] }}</div>
        @endif
    @endif

    @unless(in_array($document, ['confirmation'], true))
        <div class="signs">
            <div class="sign">Event Director<br>{{ $committeeByRole['event_director']->name ?? '' }}</div>
            <div class="sign">{{ $document === 'budget' || $document === 'report' ? 'Finance Officer' : 'Logistics & Procurement' }}<br>{{ $committeeByRole[$document === 'budget' || $document === 'report' ? 'finance' : 'logistics_procurement']->name ?? '' }}</div>
        </div>
    @endunless
@endsection
