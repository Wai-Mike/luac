<?php

namespace App\Mail;

use App\Models\YouthMember;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailable;

class YouthCensusThankYouMail extends Mailable
{
    public const FROM_ADDRESS = 'info@luac-akook-yieu.org';

    public function __construct(public YouthMember $member)
    {
    }

    public function envelope(): Envelope
    {
        $from = new Address(self::FROM_ADDRESS, 'Luac Akook Yieu Youth Association (LAYYA)');

        return new Envelope(
            from: $from,
            replyTo: [$from],
            subject: 'Thank you for registering with LAYYA',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.youth-census-thank-you',
            with: [
                'firstName' => $this->member->first_name,
                'appName' => 'Luac Akook Yieu Youth Association (LAYYA)',
                'logoPath' => public_path('images/logo.jpg'),
                'logoUrl' => rtrim((string) config('app.url'), '/').'/images/logo.jpg',
                'contactEmail' => self::FROM_ADDRESS,
            ],
        );
    }
}
