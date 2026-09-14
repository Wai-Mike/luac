@extends('operations.documents.layout')

@php
    $currencyLabel = \App\Support\AssociationMoney::currencyLabel($order->currency);
    $paymentLabel = \App\Support\AssociationMoney::paymentLabel($order->payment_method);
@endphp

@section('title', 'Purchase request order')
@section('downloadUrl', $order->download_url)

@section('body')
    <div class="meta">
        <div><strong>Reference</strong><span class="ref">{{ $order->reference }}</span></div>
        <div><strong>Date</strong>{{ $order->created_at?->format('d M Y') }}</div>
        <div><strong>Request</strong>{{ $order->title }}</div>
        <div><strong>Status</strong>{{ ucfirst($order->status) }}</div>
        <div><strong>Department</strong>{{ $order->department?->name ?: 'Association' }}</div>
        <div><strong>Requested by</strong>{{ $order->requester?->name ?: '—' }}</div>
        <div><strong>Reviewed by (SG)</strong>{{ $order->reviewer?->name ?: 'Pending' }}</div>
        <div><strong>Approved by (Chairman)</strong>{{ $order->approver?->name ?: 'Pending' }}</div>
        <div><strong>Payment released by</strong>{{ $order->payer?->name ?: 'Pending' }}</div>
        <div><strong>Currency</strong>{{ $currencyLabel }}</div>
        <div><strong>Payment method</strong>{{ $paymentLabel }}</div>
    </div>

    @if($order->purpose)
        <div class="notes"><strong>Purpose</strong><br>{{ $order->purpose }}</div>
    @endif

    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th class="num">Qty</th>
                <th class="num">Unit cost</th>
                <th class="num">Amount</th>
            </tr>
        </thead>
        <tbody>
            @forelse($order->items as $item)
                <tr>
                    <td>{{ $item->description }}</td>
                    <td class="num">{{ $item->quantity }}</td>
                    <td class="num">{{ number_format((float) $item->unit_cost, 2) }}</td>
                    <td class="num">{{ number_format($item->quantity * (float) $item->unit_cost, 2) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="4">{{ $order->title }}</td>
                </tr>
            @endforelse
        </tbody>
    </table>
    <p class="total">Total requested: {{ $currencyLabel }} {{ number_format((float) $order->amount, 2) }}</p>

    @if($order->review_notes)
        <div class="notes"><strong>Review notes</strong><br>{{ $order->review_notes }}</div>
    @endif

    <div class="signs">
        <div class="sign">Requested by<br>{{ $order->requester?->name }}</div>
        <div class="sign">Reviewed by Secretary General<br>{{ $order->reviewer?->name }}</div>
        <div class="sign">Approved by Chairman<br>{{ $order->approver?->name }}</div>
        <div class="sign">Finance released payment<br>{{ $order->payer?->name }}</div>
    </div>
@endsection
