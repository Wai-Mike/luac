<?php

namespace App\Support;

use App\Models\SiteMedia;
use Illuminate\Support\Facades\Schema;

class SiteMediaRepository
{
    /** @return list<array<string, mixed>> */
    public static function gallery(): array
    {
        if (! Schema::hasTable('site_media')) {
            return self::fallbackGallery();
        }

        self::syncBundledGallery();

        $items = SiteMedia::query()
            ->gallery()
            ->visible()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (SiteMedia $item) => $item->toFrontendImage())
            ->all();

        return $items !== [] ? $items : self::fallbackGallery();
    }

    public static function syncBundledGallery(): void
    {
        if (! Schema::hasTable('site_media')) {
            return;
        }

        $existing = SiteMedia::query()
            ->gallery()
            ->pluck('path')
            ->map(fn (?string $path) => self::normalizePath($path))
            ->filter()
            ->flip()
            ->all();

        foreach (self::fallbackGallery() as $index => $item) {
            $path = $item['src'] ?? null;
            $normalized = self::normalizePath($path);

            if ($normalized === '' || isset($existing[$normalized])) {
                continue;
            }

            SiteMedia::query()->create([
                'kind' => SiteMedia::KIND_GALLERY,
                'title' => $item['title'] ?? $item['caption'] ?? 'Gallery photo',
                'caption' => $item['caption'] ?? null,
                'category' => $item['category'] ?? 'Community',
                'source' => 'bundled',
                'path' => $path,
                'status' => 'visible',
                'sort_order' => 100 + $index,
            ]);

            $existing[$normalized] = true;
        }
    }

    private static function normalizePath(?string $path): string
    {
        if (! $path) {
            return '';
        }

        $parsed = parse_url($path, PHP_URL_PATH);

        return '/'.ltrim(is_string($parsed) && $parsed !== '' ? $parsed : $path, '/');
    }

    /** @return list<array<string, mixed>> */
    public static function videos(): array
    {
        if (! Schema::hasTable('site_media')) {
            return self::fallbackVideos();
        }

        $items = SiteMedia::query()
            ->videos()
            ->visible()
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (SiteMedia $item) => $item->toFrontendVideo())
            ->all();

        return $items !== [] ? $items : self::fallbackVideos();
    }

    /** @return list<string> */
    public static function imageUrls(int $limit = 12): array
    {
        $urls = array_values(array_filter(array_map(
            fn (array $item) => $item['src'] ?? null,
            self::gallery()
        )));

        if ($urls === []) {
            return [];
        }

        return array_slice($urls, 0, $limit);
    }

    /** @return list<array<string, mixed>> */
    public static function fallbackGallery(): array
    {
        $pool = [
            ['src' => '/images/cover.jpg', 'caption' => 'Cultural Day 2025 — Celebrating Luac Heritage', 'title' => 'Cultural Day 2025 — Celebrating Luac Heritage', 'tag' => 'Culture', 'category' => 'Culture', 'date' => '10 Sep 2026', 'status' => 'published'],
            ['src' => '/images/cover1.jpg', 'caption' => 'Tawus Day 2025 — Girls, mentors and families', 'title' => 'Tawus Day 2025 — Girls, mentors and families', 'tag' => 'Tawus Hub', 'category' => 'Tawus Hub', 'date' => '01 Sep 2026', 'status' => 'published'],
            ['src' => '/images/education.jpg', 'caption' => 'Learning circle — youth skills in Juba', 'title' => 'Learning circle — youth skills in Juba', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '08 Sep 2026', 'status' => 'published'],
            ['src' => '/images/education1.jpg', 'caption' => 'Classroom session — girls education support', 'title' => 'Classroom session — girls education support', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '20 Aug 2026', 'status' => 'published'],
            ['src' => '/images/football.jpg', 'caption' => 'Sports day 2025 — football for unity', 'title' => 'Sports day 2025 — football for unity', 'tag' => 'Sports', 'category' => 'Sports', 'date' => '04 Sep 2026', 'status' => 'published'],
            ['src' => '/images/youth.jpg', 'caption' => 'Youth leadership meeting in Juba', 'title' => 'Youth leadership meeting in Juba', 'tag' => 'Community', 'category' => 'Community', 'date' => '28 Aug 2026', 'status' => 'published'],
            ['src' => '/images/Youth-engagement.jpeg', 'caption' => 'Youth engagement workshop with LAYYA', 'title' => 'Youth engagement workshop with LAYYA', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '22 Aug 2026', 'status' => 'published'],
            ['src' => '/images/Gender-equality.jpeg', 'caption' => 'Gender equality session for Luac girls', 'title' => 'Gender equality session for Luac girls', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '18 Aug 2026', 'status' => 'published'],
            ['src' => '/images/Women Empowerment.jpeg', 'caption' => 'Women empowerment gathering 2025', 'title' => 'Women empowerment gathering 2025', 'tag' => 'Community', 'category' => 'Community', 'date' => '12 Aug 2026', 'status' => 'published'],
            ['src' => '/images/Executive.jpeg', 'caption' => 'LAYYA executive planning with youth', 'title' => 'LAYYA executive planning with youth', 'tag' => 'Community', 'category' => 'Community', 'date' => '08 Aug 2026', 'status' => 'published'],
            ['src' => '/images/nyalith.jpg', 'caption' => 'Mentorship at Tawus Hub — Angelina Nyalith', 'title' => 'Mentorship at Tawus Hub — Angelina Nyalith', 'tag' => 'Tawus Hub', 'category' => 'Tawus Hub', 'date' => '04 Aug 2026', 'status' => 'published'],
            ['src' => '/images/akur.jpg', 'caption' => 'Girls leadership circle — Luac youth', 'title' => 'Girls leadership circle — Luac youth', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '01 Aug 2026', 'status' => 'published'],
            ['src' => '/images/chuchu.jpg', 'caption' => 'Cultural celebration with LAYYA youth', 'title' => 'Cultural celebration with LAYYA youth', 'tag' => 'Culture', 'category' => 'Culture', 'date' => '28 Jul 2026', 'status' => 'published'],
            ['src' => '/images/Jok-wuor.jpg', 'caption' => 'Secretary General with community members', 'title' => 'Secretary General with community members', 'tag' => 'Community', 'category' => 'Community', 'date' => '20 Jul 2026', 'status' => 'published'],
            ['src' => '/images/Akon-Mawai.jpg', 'caption' => 'Community outreach in Juba', 'title' => 'Community outreach in Juba', 'tag' => 'Community', 'category' => 'Community', 'date' => '14 Jul 2026', 'status' => 'published'],
            ['src' => '/images/abong.jpeg', 'caption' => 'LAYYA members at a community visit', 'title' => 'LAYYA members at a community visit', 'tag' => 'Community', 'category' => 'Community', 'date' => '08 Jul 2026', 'status' => 'published'],
        ];

        return array_values(array_filter($pool, fn (array $item) => is_file(public_path(ltrim($item['src'], '/')))));
    }

    /** @return list<array<string, mixed>> */
    public static function fallbackVideos(): array
    {
        return [
            [
                'title' => 'Tawus Day — cultural celebration',
                'year' => 'Archive',
                'category' => 'Tawus Hub',
                'poster' => '/images/cover.jpg',
                'description' => 'Girls, mentors, and families mark the year with skills, song, and community gathering.',
                'src' => null,
                'youtubeId' => null,
                'date' => '10 Sep 2026',
                'status' => 'published',
                'duration' => '4:12',
                'views' => 128,
            ],
            [
                'title' => 'Youth cultural parade',
                'year' => 'Archive',
                'category' => 'Culture',
                'poster' => '/images/cover1.jpg',
                'description' => 'LAYYA youth in procession — a living record of identity, discipline, and pride.',
                'src' => null,
                'youtubeId' => null,
                'date' => '02 Sep 2026',
                'status' => 'published',
                'duration' => '3:48',
                'views' => 86,
            ],
            [
                'title' => 'Sports & unity matches',
                'year' => 'Archive',
                'category' => 'Sports',
                'poster' => '/images/football.jpg',
                'description' => 'Football and field days that build teamwork across the community.',
                'src' => null,
                'youtubeId' => null,
                'date' => '18 Aug 2026',
                'status' => 'published',
                'duration' => '5:06',
                'views' => 204,
            ],
        ];
    }
}
