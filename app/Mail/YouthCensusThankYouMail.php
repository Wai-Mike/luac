<?php

namespace App\Mail;

use App\Models\YouthMember;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class YouthCensusThankYouMail extends Mailable
{
    use SerializesModels;

    public const FROM_ADDRESS = 'info@luac-akook-yieu.org';

    public const WEBSITE_URL = 'https://luac-akook-yieu.org';

    public const WEBSITE_DISPLAY = 'www.luac-akook-yieu.org';

    public function __construct(public YouthMember $member)
    {
    }

    public function envelope(): Envelope
    {
        $from = new Address(self::FROM_ADDRESS, 'Luac Akook Yieu Youth Association (LAYYA)');

        return new Envelope(
            from: $from,
            replyTo: [$from],
            subject: 'Thank You for registering',
        );
    }

    public function content(): Content
    {
        $logoPath = public_path('images/logo.jpg');

        return new Content(
            html: 'emails.youth-census-thank-you',
            text: 'emails.youth-census-thank-you-text',
            with: [
                'firstName' => $this->member->first_name ?: 'youth',
                'logoPath' => is_file($logoPath) ? $logoPath : null,
                'logoUrl' => self::WEBSITE_URL.'/images/logo.jpg',
                'contactEmail' => self::FROM_ADDRESS,
                'websiteUrl' => self::WEBSITE_URL,
                'websiteDisplay' => self::WEBSITE_DISPLAY,
            ],
        );
    }
}
