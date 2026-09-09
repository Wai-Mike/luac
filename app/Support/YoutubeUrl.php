<?php

namespace App\Support;

class YoutubeUrl
{
    public static function id(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        $value = trim($value);

        if (preg_match('/^[A-Za-z0-9_-]{6,}$/', $value)) {
            return $value;
        }

        if (preg_match('~(?:youtu\.be/|youtube\.com/(?:watch\?v=|embed/|shorts/|live/))([A-Za-z0-9_-]{6,})~', $value, $matches)) {
            return $matches[1];
        }

        return null;
    }

    public static function poster(?string $id): ?string
    {
        return $id ? "https://img.youtube.com/vi/{$id}/hqdefault.jpg" : null;
    }
}
