<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class AdminNotification extends Model
{
    protected $fillable = [
        'type',
        'title',
        'body',
        'url',
        'read_at',
    ];

    protected function casts(): array
    {
        return [
            'read_at' => 'datetime',
        ];
    }

    public static function record(string $type, string $title, ?string $body = null, ?string $url = null): ?self
    {
        if (! Schema::hasTable('admin_notifications')) {
            return null;
        }

        return self::query()->create([
            'type' => $type,
            'title' => $title,
            'body' => $body,
            'url' => self::relativeUrl($url),
        ]);
    }

    public static function relativeUrl(?string $url): ?string
    {
        if (! $url) {
            return null;
        }

        $parts = parse_url($url);
        if (empty($parts['path'])) {
            return $url;
        }

        return $parts['path'].(isset($parts['query']) ? '?'.$parts['query'] : '');
    }
}
