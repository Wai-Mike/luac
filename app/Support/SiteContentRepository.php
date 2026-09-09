<?php

namespace App\Support;

use App\Models\SiteContent;
use Illuminate\Support\Facades\Schema;

class SiteContentRepository
{
    public static function defaults(): array
    {
        return [
            'hero' => [
                'headline' => "Building Unity.\nServing Luac.\nLeading Together.",
                'subtext' => 'LAYYA builds unity and patriotic participation of youth in the development of Luac community. We are a non-political association.',
                'location' => 'Juba · Khorfulus',
            ],
            'hero_stats' => [
                ['value' => '1,200+', 'label' => 'Youth reached'],
                ['value' => '5', 'label' => 'Core programs'],
                ['value' => '12', 'label' => 'Community projects'],
                ['value' => '2026–2028', 'label' => 'Strategic horizon'],
            ],
            'mission_vision' => [
                'heading' => "For Luac youth,\nand Luac community",
                'mission' => 'Bring Luac youth together to serve our community.',
                'vision' => 'A strong Luac where young people grow, work, and lead.',
            ],
            'contact' => [
                'phone' => '0927 779 952',
                'email' => 'layya.youth@gmail.com',
                'address' => 'Juba and Khorfulus · South Sudan',
                'hours' => 'Monday–Friday, 9:00–17:00',
            ],
            'executive_members' => [
                ['name' => 'Eng. Wai Michael Kat', 'role' => 'Chairman', 'image' => '/images/rehan.jpg'],
                ['name' => 'Akur', 'role' => 'Deputy Chairman', 'image' => '/images/akur.jpg'],
                ['name' => 'Mr. Jok Wuor Miyen', 'role' => 'Secretary General', 'image' => '/images/youth.jpg'],
                ['name' => 'Mareng', 'role' => 'Deputy Secretary General', 'image' => '/images/mareng.jpg'],
                ['name' => 'Nyalith', 'role' => 'Treasurer', 'image' => '/images/nyalith.jpg'],
                ['name' => 'Nyantet', 'role' => 'Deputy Treasurer', 'image' => '/images/nyantet.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for Information & ICT', 'image' => '/images/sabrina.jpg'],
                ['name' => 'Nyadak Suzan', 'role' => 'Secretary for Programs & Welfare', 'image' => '/images/youth.jpg'],
                ['name' => 'Yaba', 'role' => 'Secretary for Education', 'image' => '/images/yaba.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for Gender & Women Affairs', 'image' => '/images/akur.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for Sports & Culture', 'image' => '/images/chuchu.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for External Relations', 'image' => '/images/mareng.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for Mobilization', 'image' => '/images/nyalith.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for Protocol & Security', 'image' => '/images/nyantet.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for Health & Wellbeing', 'image' => '/images/rehan.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Secretary for Livelihoods', 'image' => '/images/sabrina.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Organizing Secretary', 'image' => '/images/yaba.jpg'],
            ],
            'council_members' => [
                ['name' => 'Counsel Chol Gach Abiel', 'role' => 'Speaker', 'image' => '/images/youth.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Deputy Speaker', 'image' => '/images/akur.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Clerk of the Council', 'image' => '/images/chuchu.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Council Member', 'image' => '/images/mareng.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Council Member', 'image' => '/images/nyalith.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Council Member', 'image' => '/images/nyantet.jpg'],
                ['name' => 'To be confirmed', 'role' => 'Council Member', 'image' => '/images/rehan.jpg'],
            ],
        ];
    }

    public static function get(): array
    {
        if (! Schema::hasTable('site_contents')) {
            return self::defaults();
        }

        $stored = SiteContent::query()->pluck('value', 'key')->all();
        $defaults = self::defaults();

        $merged = $defaults;
        foreach ($defaults as $key => $default) {
            if (isset($stored[$key]) && is_array($stored[$key])) {
                $merged[$key] = is_array($default) && array_is_list($default)
                    ? $stored[$key]
                    : array_replace_recursive($default, $stored[$key]);
            }
        }

        return $merged;
    }

    public static function put(array $payload): void
    {
        foreach (array_keys(self::defaults()) as $key) {
            if (! array_key_exists($key, $payload)) {
                continue;
            }

            SiteContent::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $payload[$key]]
            );
        }
    }
}
