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
            ['src' => '/images/cover.jpg', 'caption' => 'Community gathering', 'title' => 'Community gathering', 'tag' => 'Community', 'category' => 'Community', 'date' => '10 Sep 2026', 'status' => 'published'],
            ['src' => '/images/education.jpg', 'caption' => 'Education & skills', 'title' => 'Education & skills', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '08 Sep 2026', 'status' => 'published'],
            ['src' => '/images/football.jpg', 'caption' => 'Sports and unity', 'title' => 'Sports and unity', 'tag' => 'Sports', 'category' => 'Sports', 'date' => '04 Sep 2026', 'status' => 'published'],
            ['src' => '/images/cover1.jpg', 'caption' => 'Tawus Hub', 'title' => 'Tawus Hub', 'tag' => 'Tawus Hub', 'category' => 'Tawus Hub', 'date' => '01 Sep 2026', 'status' => 'published'],
            ['src' => '/images/youth.jpg', 'caption' => 'Youth leadership', 'title' => 'Youth leadership', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '28 Aug 2026', 'status' => 'published'],
            ['src' => '/images/education1.jpg', 'caption' => 'Learning circles', 'title' => 'Learning circles', 'tag' => 'Programs', 'category' => 'Programs', 'date' => '20 Aug 2026', 'status' => 'published'],
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
