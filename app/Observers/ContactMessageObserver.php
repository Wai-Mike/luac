<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\AdminNotification;
use App\Models\ContactMessage;

class ContactMessageObserver
{
    public function created(ContactMessage $message): void
    {
        AdminNotification::record(
            'contact',
            'New contact message',
            trim($message->name).($message->subject ? ' · '.$message->subject : ''),
            route('admin.contacts.index')
        );

        ActivityLog::record(
            'contact.received',
            'Contact feedback: '.trim($message->name).($message->subject ? ' — '.$message->subject : ''),
            $message,
            ['email' => $message->email, 'subject' => $message->subject]
        );
    }
}
