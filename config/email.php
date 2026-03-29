<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Email Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the email configuration for the application.
    | You can customize the email settings here.
    |
    */

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'noreply@layya.org'),
        'name' => env('MAIL_FROM_NAME', 'Luac Akok Yieu Youth Association (LAYYA)'),
    ],

    'reply_to' => [
        'address' => env('MAIL_REPLY_TO_ADDRESS', 'support@layya.org'),
        'name' => env('MAIL_REPLY_TO_NAME', 'LAYYA Support Team'),
    ],

    'templates' => [
        'welcome' => 'emails.welcome',
        'user_registered' => 'emails.user-registered',
        'email_verification' => 'emails.verify-email',
        'password_reset' => 'emails.password-reset',
    ],

    'queue' => [
        'enabled' => env('MAIL_QUEUE_ENABLED', true),
        'connection' => env('MAIL_QUEUE_CONNECTION', 'default'),
    ],
];
