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
            ['src' => '/images/cover.jpg', 'caption' => 'Community gathering', 'tag' => 'Community', 'category' => 'Community'],
            ['src' => '/images/education.jpg', 'caption' => 'Education & skills', 'tag' => 'Programs', 'category' => 'Programs'],
            ['src' => '/images/football.jpg', 'caption' => 'Sports and unity', 'tag' => 'Sports', 'category' => 'Sports'],
            ['src' => '/images/cover1.jpg', 'caption' => 'Tawus Hub', 'tag' => 'Tawus Hub', 'category' => 'Tawus Hub'],
            ['src' => '/images/youth.jpg', 'caption' => 'Youth leadership', 'tag' => 'Programs', 'category' => 'Programs'],
            ['src' => '/images/education1.jpg', 'caption' => 'Learning circles', 'tag' => 'Programs', 'category' => 'Programs'],
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
            ],
            [
                'title' => 'Youth cultural parade',
                'year' => 'Archive',
                'category' => 'Culture',
                'poster' => '/images/cover1.jpg',
                'description' => 'LAYYA youth in procession — a living record of identity, discipline, and pride.',
                'src' => null,
                'youtubeId' => null,
            ],
            [
                'title' => 'Sports & unity matches',
                'year' => 'Archive',
                'category' => 'Sports',
                'poster' => '/images/football.jpg',
                'description' => 'Football and field days that build teamwork across the community.',
                'src' => null,
                'youtubeId' => null,
            ],
        ];
    }
}
