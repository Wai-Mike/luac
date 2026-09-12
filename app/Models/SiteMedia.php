<?php

namespace App\Models;

use App\Support\YoutubeUrl;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SiteMedia extends Model
{
    public const KIND_GALLERY = 'gallery';

    public const KIND_VIDEO = 'video';

    protected $table = 'site_media';

    protected $fillable = [
        'kind',
        'title',
        'caption',
        'category',
        'year',
        'source',
        'path',
        'poster_path',
        'youtube_url',
        'youtube_id',
        'status',
        'sort_order',
        'created_by',
    ];

    protected $appends = [
        'url',
        'poster_url',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeVisible(Builder $query): Builder
    {
        return $query->where('status', 'visible');
    }

    public function scopeGallery(Builder $query): Builder
    {
        return $query->where('kind', self::KIND_GALLERY);
    }

    public function scopeVideos(Builder $query): Builder
    {
        return $query->where('kind', self::KIND_VIDEO);
    }

    public function getUrlAttribute(): ?string
    {
        return $this->publicUrl($this->path);
    }

    public function getPosterUrlAttribute(): ?string
    {
        if ($this->poster_path) {
            return $this->publicUrl($this->poster_path);
        }

        if ($this->youtube_id) {
            return YoutubeUrl::poster($this->youtube_id);
        }

        if ($this->kind === self::KIND_GALLERY) {
            return $this->url;
        }

        return null;
    }

    public function toFrontendVideo(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->caption,
            'category' => $this->category ?: 'Community',
            'year' => $this->year ?: 'Archive',
            'date' => optional($this->created_at)->format('d M Y'),
            'status' => $this->status === 'visible' ? 'published' : ($this->status ?: 'pending'),
            'poster' => $this->poster_url,
            'src' => $this->source === 'upload' ? $this->url : null,
            'youtubeId' => $this->youtube_id,
            'duration' => null,
            'views' => 0,
        ];
    }

    public function toFrontendImage(): array
    {
        return [
            'id' => $this->id,
            'src' => $this->url,
            'caption' => $this->title,
            'title' => $this->title,
            'tag' => $this->category ?: 'Community',
            'category' => $this->category ?: 'Community',
            'date' => optional($this->created_at)->format('d M Y'),
            'status' => $this->status === 'visible' ? 'published' : ($this->status ?: 'pending'),
        ];
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return '/storage/'.ltrim($path, '/');
    }
}
