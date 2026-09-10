<?php

namespace App\Observers;

use App\Models\AdminNotification;
use App\Models\YouthMember;
use App\Models\YouthMembership;
use Illuminate\Support\Facades\Schema;

class YouthMemberObserver
{
    public function created(YouthMember $youthMember): void
    {
        $fromMembership = ($youthMember->source ?? 'census') === 'membership';

        if (Schema::hasTable('youth_memberships')) {
            YouthMembership::query()->firstOrCreate(
                [
                    'youth_member_id' => $youthMember->id,
                    'year' => (int) now()->year,
                ],
                [
                    'amount_paid' => 0,
                    'currency' => 'ssp',
                ]
            );
        }

        $name = trim($youthMember->first_name.' '.$youthMember->last_name);

        AdminNotification::record(
            $fromMembership ? 'membership' : 'census',
            $fromMembership ? 'Paid membership recorded' : 'New youth census registration',
            $fromMembership ? $name.' was added as a paying member.' : $name.' joined the census.',
            $fromMembership ? route('admin.memberships.index') : route('admin.youth-members.show', $youthMember)
        );
    }
}
