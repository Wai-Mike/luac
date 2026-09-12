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
                'location' => 'Juba, South Sudan',
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
            'card_images' => [
                'mission' => '/images/youth.jpg',
                'vision' => '/images/education.jpg',
                'about' => '/images/Executive.jpeg',
                'tawus' => '/images/cover1.jpg',
                'tawus_inset' => '/images/nyalith.jpg',
                'tawus_gallery' => [
                    '/images/cover1.jpg',
                    '/images/nyalith.jpg',
                    '/images/akur.jpg',
                    '/images/Gender-equality.jpeg',
                    '/images/Women Empowerment.jpeg',
                    '/images/chuchu.jpg',
                ],
            ],
            'contact' => [
                'phone' => '0927 779 952',
                'email' => 'layya.youth@gmail.com',
                'address' => 'Juba, South Sudan',
                'hours' => 'We will respond within 24 hours',
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
            'programs' => [
                ['title' => 'Youth Empowerment', 'body' => 'Peer-led sessions, public speaking, and project design so young people can turn ideas into community action.', 'tag' => 'Leadership', 'image' => '/images/education.jpg', 'participants' => 186, 'sessions' => 12, 'facilitators' => 8, 'status' => 'active'],
                ['title' => 'Gender Equality & Advocacy', 'body' => 'Safe circles, advocacy skills, and collaborative campaigns that challenge barriers and celebrate leadership.', 'tag' => 'Advocacy', 'image' => '/images/akur.jpg', 'participants' => 94, 'sessions' => 9, 'facilitators' => 6, 'status' => 'active'],
                ['title' => 'Community Engagement', 'body' => 'Volunteering, neighborhood dialogue, and sports and culture events that build trust and teamwork.', 'tag' => 'Community', 'image' => '/images/cover.jpg', 'participants' => 210, 'sessions' => 16, 'facilitators' => 11, 'status' => 'active'],
                ['title' => 'Digital Innovation', 'body' => 'Digital literacy, content creation, and platforms that help youth share stories and opportunities.', 'tag' => 'Digital', 'image' => '/images/education1.jpg', 'participants' => 72, 'sessions' => 7, 'facilitators' => 5, 'status' => 'active'],
                ['title' => 'Learning & Development', 'body' => 'Workshops in life skills, civic education, and pathways to work and entrepreneurship.', 'tag' => 'Learning', 'image' => '/images/youth.jpg', 'participants' => 128, 'sessions' => 10, 'facilitators' => 7, 'status' => 'active'],
            ],
            'news_events' => [
                ['title' => 'Community meetings', 'type' => 'Gatherings', 'excerpt' => 'Quarterly town-halls on priorities and youth feedback.', 'date' => 'Ongoing', 'image' => '/images/youth.jpg', 'status' => 'published'],
                ['title' => 'Youth trainings', 'type' => 'Programs', 'excerpt' => 'Skills labs and leadership intensives across partner sites.', 'date' => 'Monthly', 'image' => '/images/education.jpg', 'status' => 'published'],
                ['title' => 'Fundraising updates', 'type' => 'Fundraising', 'excerpt' => 'Transparent milestones for campaigns and donor gratitude.', 'date' => 'Seasonal', 'image' => '/images/cover.jpg', 'status' => 'published'],
                ['title' => 'Gender equality campaigns', 'type' => 'Advocacy', 'excerpt' => 'Safe circles, media, and peer advocacy for inclusion.', 'date' => 'Year-round', 'image' => '/images/akur.jpg', 'status' => 'published'],
                ['title' => 'Sports and cultural events', 'type' => 'Culture', 'excerpt' => 'Tournaments, arts showcases, and neighborhood celebrations.', 'date' => 'Quarterly', 'image' => '/images/football.jpg', 'status' => 'published'],
                ['title' => 'Tawus Day community story', 'type' => 'Tawus Hub', 'excerpt' => 'Girls lead skills showcases, mentorship circles, and cultural celebration.', 'date' => 'Annual', 'image' => '/images/cover1.jpg', 'status' => 'published'],
            ],
            'campaigns' => [
                ['title' => 'Support 12 girls with materials', 'description' => 'Learning materials and school support for 12 girls.', 'target' => 25000, 'target_ssp' => 0, 'image' => '/images/education1.jpg'],
                ['title' => 'Youth Skills Training', 'description' => 'Vocational and digital skills sessions for employability and confidence.', 'target' => 18000, 'target_ssp' => 0, 'image' => '/images/education.jpg'],
                ['title' => 'Community Safe Spaces', 'description' => 'Rent, utilities, and supplies for youth-friendly hubs and mentors.', 'target' => 32000, 'target_ssp' => 0, 'image' => '/images/cover1.jpg'],
                ['title' => 'Sports & Culture Program', 'description' => 'Equipment, events, and coaches for football, culture, and wellness.', 'target' => 14000, 'target_ssp' => 0, 'image' => '/images/football.jpg'],
                ['title' => 'Digital Youth Lab', 'description' => 'Devices, connectivity stipends, and peer trainers for digital literacy.', 'target' => 22000, 'target_ssp' => 0, 'image' => '/images/Youth-engagement.jpeg'],
            ],
            'faqs' => [
                ['q' => 'Who can join LAYYA?', 'a' => 'Luac youth aged 18–45 may apply. Women have the right to take part in all leadership. LAYYA is a non-political association.'],
                ['q' => 'What is the Youth Census?', 'a' => 'A short registration that helps us understand skills, interests, and barriers so we can design better programs. Individual records stay with authorized staff.'],
                ['q' => 'What is Tawus Hub?', 'a' => 'A girls-centred space for vocational skills, mentorship, wellbeing, and Tawus Day — our annual cultural celebration.'],
                ['q' => 'How can I donate?', 'a' => 'Visit the Fundraising page, choose a program, and pay by bank transfer, MPESA, MTN, or contact us for details.'],
                ['q' => 'How do I volunteer or partner?', 'a' => 'Use the contact form and select Volunteering or Partnership. We will follow up with next steps.'],
            ],
            'impact_stats' => [
                ['value' => '1,000+', 'label' => 'Youth Reached'],
                ['value' => '85%', 'label' => 'Program Success Rate'],
                ['value' => '10+', 'label' => 'Community Projects'],
                ['value' => '5+', 'label' => 'Partner Organizations'],
            ],
            'values' => ['Unity', 'Self-reliance', 'Leadership', 'Equality', 'Peace', 'Culture'],
            'focus_areas' => [
                ['title' => 'Community Building', 'description' => 'Spaces where young people connect, organize, and grow together.'],
                ['title' => 'Youth Support', 'description' => 'Mentorship, wellbeing, and practical help when it matters most.'],
                ['title' => 'Gender Equality', 'description' => 'Programs that elevate girls’ leadership and safe participation.'],
                ['title' => 'Leadership & Skills Development', 'description' => 'Training, facilitation, and hands-on learning for real-world impact.'],
                ['title' => 'Fundraising & Community Support', 'description' => 'Transparent campaigns that fund education, safe spaces, and action.'],
                ['title' => 'Digital Innovation', 'description' => 'Using technology to amplify youth voices and opportunities.'],
            ],
            'constitution_facts' => [
                'status' => 'LAYYA is a non-political youth association.',
                'aim' => 'Building unity and patriotic participation of youth in the development of Luac community.',
                'languages' => 'Thong-de-Jieng (Dinka), English and Arabic. All religions are respected equally.',
                'places' => 'Juba, South Sudan.',
                'membership' => 'Luac youth aged 18–45. Women have the right to take part in all leadership.',
                'term' => 'Central and Branch Executive offices last two years, with one possible extra term.',
                'symbols' => [
                    ['name' => 'Crocodile', 'meaning' => 'Cultural identity of Luac'],
                    ['name' => 'Shield', 'meaning' => 'Bravery and defence of our forefathers'],
                    ['name' => 'Land', 'meaning' => 'The fertile land of our community'],
                ],
                'pillars' => [
                    ['label' => 'Youth and women', 'description' => 'Spiritual, moral, physical, academic and substantial development.'],
                    ['label' => 'Leadership and work', 'description' => 'Skills, self-reliance projects, and care for the environment.'],
                    ['label' => 'Luac first', 'description' => 'The interest of Luac comes first in every activity.'],
                    ['label' => 'Peace and unity', 'description' => 'Peaceful co-existence with neighbouring youth and within Luac.'],
                ],
            ],
            'community_story' => [
                'title' => "Tawus Day builds\nskills and leadership",
                'body' => "Each year, Tawus Day brings girls, mentors, and families together to celebrate culture and the skills learned at Tawus Hub — braiding, decor, wellbeing, and the confidence to lead.\n\nStories like these remind us why LAYYA exists: so young people in Luac Akook Yieu can be seen, trained, and trusted with real responsibility.",
                'quote' => 'Tawus Hub gave my daughter skills and a place to lead. LAYYA saw us, trained us, and trusted us with real work.',
                'quote_attribution' => 'Angelina Nyalith Agoth, Tawus Hub mentor',
                'name' => 'Angelina Nyalith Agoth',
                'role' => 'A mother and youth mentor',
                'image' => '/images/nyalith.jpg',
            ],
            'quotes' => [
                [
                    'quote' => 'Tawus Hub gave my daughter skills and a place to lead. LAYYA saw us, trained us, and trusted us with real work.',
                    'name' => 'Angelina Nyalith Agoth',
                    'role' => 'Tawus Hub mentor',
                ],
                [
                    'quote' => 'LAYYA helped me believe my voice matters — we turned our ideas into a real community project.',
                    'name' => 'Youth participant',
                    'role' => 'Luac Akook Yieu',
                ],
                [
                    'quote' => 'The mentorship and safe space changed how I plan my future.',
                    'name' => 'Program alum',
                    'role' => 'Juba',
                ],
            ],
            'tawus_hub' => [
                'title' => 'A place for girls to grow',
                'subtitle' => 'LAYYA’s girls-centred space for skills, confidence, and community — from crafts and beauty labs to mentorship and Tawus Day.',
                'body' => 'Tawus Hub is a trusted room for girls in Luac Akook Yieu — a place to learn a trade, practise leadership, and be seen.',
                'skills' => ['Decor & event styling', 'Braiding & beauty', 'Manicure & pedicure', 'Mentorship circles', 'Wellbeing support', 'Peer leadership'],
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

        $heroLocation = (string) ($merged['hero']['location'] ?? '');
        if ($heroLocation === '' || str_contains($heroLocation, 'Khorfulus') || $heroLocation === 'Juba') {
            $merged['hero']['location'] = 'Juba, South Sudan';
        }

        $merged['contact']['address'] = 'Juba, South Sudan';
        $merged['contact']['phone'] = $merged['contact']['phone'] ?: '0927 779 952';
        $merged['contact']['hours'] = 'We will respond within 24 hours';
        if (($merged['constitution_facts']['places'] ?? '') !== 'Juba, South Sudan.') {
            $merged['constitution_facts']['places'] = 'Juba, South Sudan.';
        }

        if (is_array($merged['campaigns'] ?? null)) {
            $defaultCampaignImages = [];
            foreach ($defaults['campaigns'] as $campaign) {
                $defaultCampaignImages[$campaign['title']] = $campaign['image'] ?? '/images/cover.jpg';
            }

            $merged['campaigns'] = array_map(function ($campaign) use ($defaultCampaignImages) {
                if (($campaign['title'] ?? '') === 'Support Girls Education') {
                    $campaign['title'] = 'Support 12 girls with materials';
                    $campaign['description'] = 'Learning materials and school support for 12 girls.';
                }

                if (! filled($campaign['image'] ?? null)) {
                    $campaign['image'] = $defaultCampaignImages[$campaign['title'] ?? ''] ?? '/images/cover.jpg';
                }

                return $campaign;
            }, $merged['campaigns']);
        }

        $cardDefaults = $defaults['card_images'];
        $cards = is_array($merged['card_images'] ?? null) ? $merged['card_images'] : [];
        $merged['card_images'] = array_replace_recursive($cardDefaults, $cards);
        if (! is_array($merged['card_images']['tawus_gallery'] ?? null) || $merged['card_images']['tawus_gallery'] === []) {
            $merged['card_images']['tawus_gallery'] = $cardDefaults['tawus_gallery'];
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
