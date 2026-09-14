@extends('operations.documents.layout')

@php
    $payload = $report->payloadData();
    $departmentName = $report->department?->name ?: ($payload['submitted_by'] ?: 'Association');
    $departmentTitle = \App\Support\DepartmentalReport::departmentOf($departmentName);
    $kind = $report->kind_label;
    $period = $report->period ?: '—';
    $metrics = collect($payload['metrics'] ?? [])->filter(fn ($row) => filled($row['metric'] ?? null) || filled($row['status'] ?? null));
    $risks = collect($payload['risks'] ?? [])->filter(fn ($row) => filled($row['risk'] ?? null) || filled($row['effect'] ?? null) || filled($row['mitigation'] ?? null));
    $actions = collect($payload['actions'] ?? [])->filter(fn ($row) => filled($row['item'] ?? null));
    $columns = array_values(array_filter($payload['attachment_columns'] ?? ['S/N', 'Full Name', 'School Admitted In']));
    $attachmentRows = collect($payload['attachment_rows'] ?? [])->filter(fn ($row) => collect($row)->filter(fn ($cell) => filled($cell))->isNotEmpty());
    $cc = collect($payload['cc'] ?? [])->filter();
    $objectives = \App\Support\DepartmentalReport::lines($payload['objectives'] ?? '');
    $priorities = \App\Support\DepartmentalReport::lines($payload['next_priorities'] ?? '');
    $recommendations = \App\Support\DepartmentalReport::lines($payload['recommendations'] ?? '');
@endphp

@section('title', $kind)
@section('paperType', 'report')
@section('downloadUrl', $report->download_url)

@section('body')
    <table class="cover">
        <tbody>
            <tr><th>Department</th><td>{{ $departmentTitle }}</td></tr>
            <tr><th>Report Title</th><td>{{ $report->title }}</td></tr>
            <tr><th>Reporting Period</th><td>{{ $period }}</td></tr>
            <tr><th>Date Submitted</th><td>{{ optional($report->submitted_on)->format('F j, Y') ?: $report->created_at?->format('F j, Y') }}</td></tr>
            <tr><th>Submitted To</th><td>{{ $payload['submitted_to'] ?: 'The Office of the Chairperson' }}</td></tr>
            <tr><th>Submitted By</th><td>{{ $payload['submitted_by'] ?: $departmentTitle }}</td></tr>
            <tr><th>Prepared By</th><td>{{ $payload['prepared_by'] ?: $report->author?->name ?: '—' }}</td></tr>
            <tr><th>Reference</th><td>{{ $report->reference }}</td></tr>
        </tbody>
    </table>

    <section class="section">
        <h2>1. Executive Summary</h2>
        <p>{{ $report->summary ?: '—' }}</p>
    </section>

    <section class="section">
        <h2>2. Purpose of the Report</h2>
        <p>{{ $payload['purpose'] ?: $report->context ?: 'This monthly report provides leadership with timely information on departmental progress, financial status, achievements, challenges, and required follow-up actions.' }}</p>
    </section>

    <section class="section">
        <h2>3. Department Objectives for the Month</h2>
        @if($objectives === [])
            <p>—</p>
        @else
            <ol>
                @foreach($objectives as $line)
                    <li>{{ $line }}</li>
                @endforeach
            </ol>
        @endif
    </section>

    <section class="section">
        <h2>4. Key Metrics and Performance Summary</h2>
        @if($metrics->isEmpty())
            <p>—</p>
        @else
            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Status / Amount</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($metrics as $row)
                        <tr>
                            <td>{{ $row['metric'] ?? '' }}</td>
                            <td>{{ $row['status'] ?? '' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </section>

    <section class="section">
        <h2>5. Major Highlights and Achievements</h2>
        <p>{{ $payload['highlights'] ?: $report->deliverables ?: '—' }}</p>
    </section>

    <section class="section">
        <h2>6. Financial Update</h2>
        <p>{{ $payload['financial_update'] ?: $report->financial_summary ?: '—' }}</p>
    </section>

    <section class="section">
        <h2>7. Challenges, Constraints, and Pending Issues</h2>
        <p>{{ $payload['challenges'] ?: $report->challenges ?: '—' }}</p>
    </section>

    <section class="section">
        <h2>8. Risks and Mitigation Measures</h2>
        @if($risks->isEmpty())
            <p>—</p>
        @else
            <table>
                <thead>
                    <tr>
                        <th>Risk</th>
                        <th>Possible Effect</th>
                        <th>Mitigation Measure</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($risks as $row)
                        <tr>
                            <td>{{ $row['risk'] ?? '' }}</td>
                            <td>{{ $row['effect'] ?? '' }}</td>
                            <td>{{ $row['mitigation'] ?? '' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </section>

    <section class="section">
        <h2>9. Action Items and Follow-Up Plan</h2>
        @if($actions->isEmpty())
            <p>—</p>
        @else
            <table>
                <thead>
                    <tr>
                        <th>Action Item</th>
                        <th>Responsible Office</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($actions as $row)
                        <tr>
                            <td>{{ $row['item'] ?? '' }}</td>
                            <td>{{ $row['office'] ?? $departmentName }}</td>
                            <td>{{ $row['status'] ?? 'Pending' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </section>

    <section class="section">
        <h2>10. Next Reporting Period Priorities</h2>
        @if($priorities === [])
            <p>—</p>
        @else
            <ol>
                @foreach($priorities as $line)
                    <li>{{ $line }}</li>
                @endforeach
            </ol>
        @endif
    </section>

    <section class="section">
        <h2>11. Recommendations</h2>
        @if($recommendations === [])
            <p>—</p>
        @else
            <ol>
                @foreach($recommendations as $line)
                    <li>{{ $line }}</li>
                @endforeach
            </ol>
        @endif
    </section>

    <section class="section">
        <h2>12. Conclusion</h2>
        <p>{{ $payload['conclusion'] ?: '—' }}</p>
    </section>

    <section class="section">
        <h2>13. Approval and Submission</h2>
        <table class="cover">
            <tbody>
                <tr><th>Prepared By</th><td>{{ $payload['prepared_by'] ?: $report->author?->name ?: '—' }}</td></tr>
                <tr><th>Department</th><td>{{ $departmentTitle }}</td></tr>
                <tr><th>Reviewed By</th><td>{{ $payload['reviewed_by'] ?: '' }}</td></tr>
                <tr><th>Approved By</th><td>{{ $payload['approved_by'] ?: '' }}</td></tr>
                <tr><th>Date of Approval</th><td>{{ $payload['approved_on'] ?: '' }}</td></tr>
            </tbody>
        </table>
    </section>

    <section class="section">
        <h2>13. Attachments</h2>
        @if(filled($payload['attachment_title'] ?? null))
            <p><strong>{{ $payload['attachment_title'] }}</strong></p>
        @endif
        @if(filled($payload['attachment_note'] ?? null))
            <p>{{ $payload['attachment_note'] }}</p>
        @endif
        @if($attachmentRows->isNotEmpty())
            <table>
                <thead>
                    <tr>
                        @foreach($columns as $column)
                            <th>{{ $column }}</th>
                        @endforeach
                    </tr>
                </thead>
                <tbody>
                    @foreach($attachmentRows as $index => $row)
                        <tr>
                            @foreach($columns as $colIndex => $column)
                                <td>{{ $row[$colIndex] ?? ($colIndex === 0 && ! filled($row[0] ?? null) ? $index + 1 : '') }}</td>
                            @endforeach
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
        @if($report->file_url)
            <p>Attached file: {{ $report->file_name ?: 'Supporting document' }}</p>
        @endif
        @if($attachmentRows->isEmpty() && blank($payload['attachment_title'] ?? null) && blank($payload['attachment_note'] ?? null) && ! $report->file_url)
            <p>None attached for this period.</p>
        @endif
    </section>

    <section class="section cc">
        <p><strong>Copy to Files / Cc:</strong></p>
        <ol>
            @foreach($cc as $office)
                <li>{{ $office }}</li>
            @endforeach
        </ol>
    </section>
@endsection
