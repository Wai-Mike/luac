<?php

namespace App\Observers;

use App\Models\AdminNotification;
use App\Models\AssociationExpense;

class AssociationExpenseObserver
{
    public function created(AssociationExpense $expense): void
    {
        $amount = rtrim(rtrim((string) $expense->amount, '0'), '.');
        $currency = strtoupper((string) $expense->currency);

        AdminNotification::record(
            'expense',
            'New association expense',
            $expense->title.' · '.$amount.' '.$currency,
            route('admin.finances.index')
        );
    }
}
