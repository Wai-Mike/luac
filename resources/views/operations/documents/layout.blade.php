<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    @if(! empty($org['logoUrl']))
        <link rel="icon" type="image/jpeg" href="{{ $org['logoUrl'] }}">
        <link rel="shortcut icon" href="{{ $org['logoUrl'] }}">
        <link rel="apple-touch-icon" href="{{ $org['logoUrl'] }}">
    @else
        <link rel="icon" type="image/jpeg" href="{{ asset('images/logo.jpg') }}">
        <link rel="shortcut icon" href="{{ asset('images/logo.jpg') }}">
        <link rel="apple-touch-icon" href="{{ asset('images/logo.jpg') }}">
    @endif
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            background: #F4F7F6;
            color: #172321;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
            font-feature-settings: "tnum" 1, "lnum" 1;
            font-variant-numeric: tabular-nums lining-nums;
        }
        .toolbar { position: sticky; top: 0; z-index: 2; display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; padding: 12px 16px; background: #073B3A; }
        .toolbar a, .toolbar button { appearance: none; border: 0; border-radius: 10px; padding: 8px 16px; font-size: 13px; font-weight: 700; font-family: Inter, sans-serif; text-decoration: none; cursor: pointer; }
        .toolbar .print { background: #D5A742; color: #073B3A; }
        .toolbar .download { background: #fff; color: #073B3A; }
        .sheet { width: min(840px, calc(100% - 24px)); margin: 20px auto 40px; background: #fff; border: 1px solid #DDE7E4; border-radius: 14px; box-shadow: 0 10px 30px rgba(7,59,58,.08); overflow: hidden; }
        .letterhead { display: flex; gap: 18px; align-items: center; border-bottom: 3px solid #073B3A; padding-bottom: 14px; min-width: 0; }
        .gold-rule { height: 3px; background: #D5A742; margin: 0 0 8px; }
        .letterhead img, .letterhead .mark { width: 72px; height: 72px; flex-shrink: 0; border-radius: 12px; object-fit: cover; border: 3px solid #D5A742; background: #fff; }
        .letterhead .mark { display: grid; place-items: center; font-weight: 700; color: #073B3A; font-size: 11px; letter-spacing: .06em; }
        .letterhead .brand { min-width: 0; flex: 1; }
        .letterhead h1 { margin: 0; font-family: Inter, sans-serif; font-weight: 700; color: #073B3A; overflow-wrap: break-word; }
        .letterhead p { margin: 4px 0 0; color: #687976; overflow-wrap: anywhere; }
        .badge { display: inline-block; margin-top: 8px; padding: 3px 10px; border-radius: 999px; background: #073B3A; color: #fff; letter-spacing: .08em; text-transform: uppercase; }
        .meta { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 6px 20px; margin: 16px 0; }
        .meta strong { display: block; letter-spacing: .08em; text-transform: uppercase; color: #687976; font-weight: 600; }
        table { width: 100%; max-width: 100%; table-layout: auto; border-collapse: collapse; margin: 14px 0; }
        th { background: #073B3A; color: #fff; text-align: left; overflow-wrap: anywhere; font-weight: 600; }
        td { border-bottom: 1px solid #DDE7E4; overflow-wrap: anywhere; }
        .num { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; font-variant-numeric: tabular-nums lining-nums; font-feature-settings: "tnum" 1, "lnum" 1; text-align: right; white-space: nowrap; width: 1%; }
        th.num { text-align: right; }
        .total { text-align: right; font-weight: 600; color: #073B3A; font-family: "JetBrains Mono", ui-monospace, monospace; font-variant-numeric: tabular-nums; }
        .notes { background: #F4F7F6; border: 1px solid #DDE7E4; border-radius: 10px; overflow-wrap: anywhere; }
        .signs { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 28px; margin-top: 32px; }
        .sign { min-height: 64px; min-width: 0; border-top: 1px solid #172321; padding-top: 8px; }
        .cover th { width: 34%; background: #FFF6DE; color: #073B3A; font-weight: 600; }
        .masthead { text-align: center; margin: 18px 0 10px; }
        .masthead .org { margin: 0; letter-spacing: .12em; font-weight: 700; color: #073B3A; overflow-wrap: anywhere; }
        .masthead .dept { margin: 8px 0 0; color: #073B3A; overflow-wrap: break-word; font-weight: 700; }
        .masthead .kind { margin: 8px 0 0; font-weight: 700; color: #172321; }
        .masthead .month { margin: 6px 0 0; color: #687976; }
        .section { margin: 22px 0; min-width: 0; }
        .section h2 { margin: 0 0 8px; color: #073B3A; font-weight: 700; }
        .section h3 { margin: 12px 0 6px; color: #073B3A; font-weight: 600; }
        .section p, .section li { white-space: pre-wrap; overflow-wrap: anywhere; }
        .cc { overflow-wrap: anywhere; }
        .foot { margin-top: 24px; color: #687976; }
        .flow { display: grid; gap: 6px; margin: 16px 0; }
        .flow div { border: 1px solid #DDE7E4; border-left: 4px solid #073B3A; padding: 6px 10px; }
        .quiet { color: #687976; }
        .ref { font-family: "JetBrains Mono", ui-monospace, monospace; font-variant-numeric: tabular-nums; }

        /* Logistics & procurement: dense, high-contrast, numeric precision */
        .paper-ops .sheet { padding: 28px 32px; }
        .paper-ops .letterhead h1 { font-size: 17pt; line-height: 1.2; }
        .paper-ops .letterhead p { font-size: 8.5pt; line-height: 1.3; }
        .paper-ops .badge { font-size: 8pt; font-weight: 600; }
        .paper-ops .meta { font-size: 9.5pt; line-height: 1.25; }
        .paper-ops .meta strong { font-size: 7.5pt; margin-bottom: 1px; font-family: Inter, sans-serif; }
        .paper-ops table { font-size: 9.5pt; line-height: 1.25; }
        .paper-ops th { font-size: 8.5pt; padding: 5px 8px; }
        .paper-ops td { padding: 5px 8px; overflow-wrap: break-word; }
        .paper-ops .notes { padding: 8px 10px; font-size: 9.5pt; line-height: 1.3; }
        .paper-ops .notes strong { font-size: 11pt; font-weight: 600; display: block; margin-bottom: 4px; }
        .paper-ops .total { font-size: 10pt; line-height: 1.25; margin: 6px 0; }
        .paper-ops .sign { font-size: 8pt; line-height: 1.3; }
        .paper-ops .foot, .paper-ops .quiet { font-size: 8pt; line-height: 1.3; }
        .paper-ops .flow div { font-size: 9.5pt; line-height: 1.25; }
        .paper-ops .section h2 { font-size: 12pt; font-weight: 600; }
        .paper-ops .section p, .paper-ops .section li { font-size: 9.5pt; line-height: 1.3; }

        /* Departmental reports: scan, read, review */
        .paper-report .sheet { padding: 40px 44px; }
        .paper-report .letterhead h1 { font-size: 16pt; line-height: 1.25; }
        .paper-report .letterhead p { font-size: 9pt; line-height: 1.4; }
        .paper-report .badge { font-size: 8.5pt; font-weight: 600; }
        .paper-report .masthead .org { font-size: 9pt; }
        .paper-report .masthead .dept { font-size: 17pt; line-height: 1.25; }
        .paper-report .masthead .kind { font-size: 24pt; line-height: 1.2; letter-spacing: 0; text-transform: none; }
        .paper-report .masthead .month { font-size: 11pt; line-height: 1.4; }
        .paper-report .section h2 { font-size: 17pt; line-height: 1.25; margin: 0 0 8pt; }
        .paper-report .section h3 { font-size: 13.5pt; line-height: 1.3; }
        .paper-report .section p { font-size: 11pt; line-height: 1.5; margin: 0 0 6pt; text-indent: 0; }
        .paper-report .section li { font-size: 11pt; line-height: 1.5; margin: 0 0 4pt; }
        .paper-report .section ol, .paper-report .section ul { margin: 0 0 6pt; padding-left: 1.25em; }
        .paper-report table { font-size: 10.5pt; line-height: 1.4; }
        .paper-report th { font-size: 9pt; padding: 7px 10px; }
        .paper-report td { padding: 7px 10px; }
        .paper-report .cover th { font-size: 9pt; }
        .paper-report .meta { font-size: 11pt; line-height: 1.4; }
        .paper-report .meta strong { font-size: 8.5pt; margin-bottom: 2px; }
        .paper-report .notes { padding: 12px 14px; font-size: 11pt; line-height: 1.5; }
        .paper-report .notes strong { font-size: 13.5pt; font-weight: 600; display: block; margin-bottom: 6pt; }
        .paper-report .sign { font-size: 9pt; line-height: 1.4; }
        .paper-report .foot, .paper-report .quiet, .paper-report .cc { font-size: 9pt; line-height: 1.4; }
        .paper-report .cc p { margin: 0 0 6pt; }
        .paper-report .flow div { font-size: 11pt; line-height: 1.4; }

        @media print {
            body { background: #fff; }
            .toolbar { display: none; }
            .sheet { width: auto; margin: 0; box-shadow: none; border: 0; border-radius: 0; padding: 0; }
        }
        @media (max-width: 640px) {
            .paper-ops .sheet, .paper-report .sheet { padding: 20px 16px; }
            .letterhead { align-items: flex-start; }
            .meta, .signs { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body class="paper-@yield('paperType', 'ops')">
    <div class="toolbar">
        <button class="print" type="button" onclick="window.print()">Print</button>
        <a class="download" href="@yield('downloadUrl')">Download</a>
    </div>
    <article class="sheet">
        <header class="letterhead">
            @if(! empty($org['logoUrl']))
                <img src="{{ $org['logoUrl'] }}" alt="LAYYA logo">
            @else
                <img src="{{ asset('images/logo.jpg') }}" alt="LAYYA logo">
            @endif
            <div class="brand">
                <h1>{{ $org['name'] }}</h1>
                <p>{{ $org['tagline'] }}</p>
                <p>{{ $org['address'] }} · {{ $org['phone'] }} · {{ $org['email'] }}</p>
                <span class="badge">@yield('title')</span>
            </div>
        </header>
        <div class="gold-rule" aria-hidden="true"></div>
        @yield('body')
        <p class="foot">Official LAYYA document · Keep this copy for finance and logistics records.</p>
    </article>
</body>
</html>
