<?php

namespace App\Support;

class AssociationLetterhead
{
    /**
     * @return array<string, string>
     */
    public static function data(): array
    {
        $site = SiteContentRepository::get();

        return [
            'name' => 'Luac Akook Yieu Youth Association',
            'short' => 'LAYYA',
            'tagline' => 'Building unity and patriotic participation of youth in Luac community',
            'address' => $site['contact']['address'] ?? 'Juba, South Sudan',
            'phone' => $site['contact']['phone'] ?? '0927 779 952',
            'email' => $site['contact']['email'] ?? 'info@luac-akook-yieu.org',
            'logo' => public_path('images/logo.jpg'),
            'logoUrl' => asset('images/logo.jpg'),
        ];
    }
}
