@extends('operations.documents.layout')

@php
    $currencyLabel = \App\Support\AssociationMoney::currencyLabel($receipt->currency);
    $paymentLabel = \App\Support\AssociationMoney::paymentLabel($receipt->payment_method);
@endphp

@section('title', 'Official receipt')
@section('downloadUrl', $receipt->download_url)

@section('body')
    <div class="meta">
        <div><strong>Reference</strong><span class="ref">{{ $receipt->reference }}</span></div>
        <div><strong>Date received</strong>{{ optional($receipt->received_on)->format('d M Y') ?: $receipt->created_at?->format('d M Y') }}</div>
        <div><strong>Receipt</strong>{{ $receipt->title }}</div>
        <div><strong>Department</strong>{{ $receipt->department?->name ?: 'Association' }}</div>
        <div><strong>Paid to / vendor</strong>{{ $receipt->vendor ?: '—' }}</div>
        <div><strong>Recorded by</strong>{{ $receipt->recorder?->name ?: 'Finance' }}</div>
        @if($receipt->purchaseRequest)
            <div><strong>Linked PRO</strong>{{ $receipt->purchaseRequest->reference }}</div>
        @endif
        <div><strong>Currency</strong>{{ $currencyLabel }}</div>
        <div><strong>Payment method</strong>{{ $paymentLabel }}</div>
    </div>

    @if($receipt->notes)
        <div class="notes"><strong>Particulars</strong><br>{{ $receipt->notes }}</div>
    @endif

    <table>
        <thead>
            <tr>
                <th>Description</th>
                <th class="num">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $receipt->title }}{{ $receipt->vendor ? ' — '.$receipt->vendor : '' }}</td>
                <td class="num">{{ number_format((float) $receipt->amount, 2) }}</td>
            </tr>
        </tbody>
    </table>
    <p class="total">Amount received: {{ $currencyLabel }} {{ number_format((float) $receipt->amount, 2) }}</p>

    <div class="signs">
        <div class="sign">Received / recorded by Finance<br>{{ $receipt->recorder?->name }}</div>
        <div class="sign">Acknowledged by payee / vendor</div>
    </div>
@endsection
