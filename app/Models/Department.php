<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Department extends Model
{
    /** @use HasFactory<\Database\Factories\DepartmentFactory> */
    use HasFactory, SoftDeletes;

    /**
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'status',
    ];

    protected static function booted(): void
    {
        static::creating(function (Department $department): void {
            $slug = filled($department->slug)
                ? Str::slug($department->slug)
                : Str::slug((string) $department->name);
            $department->slug = static::ensureUniqueSlug($slug !== '' ? $slug : 'department');
        });

        static::updating(function (Department $department): void {
            if (! $department->isDirty('slug')) {
                return;
            }
            $slug = Str::slug((string) $department->slug);
            $department->slug = static::ensureUniqueSlug(
                $slug !== '' ? $slug : 'department',
                $department->getKey()
            );
        });
    }

    public static function ensureUniqueSlug(string $slug, ?int $ignoreId = null): string
    {
        $candidate = $slug;
        $i = 1;
        while (static::query()
            ->withTrashed()
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->where('slug', $candidate)
            ->exists()) {
            $candidate = $slug.'-'.$i++;
        }

        return $candidate;
    }

    /** @return HasMany<Role> */
    public function roles(): HasMany
    {
        return $this->hasMany(Role::class);
    }

    /** @return HasMany<User> */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }
}
