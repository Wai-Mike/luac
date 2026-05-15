<?php

namespace App\Http\Controllers\Api\Concerns;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

trait GeneratesUniqueSlug
{
    protected function uniqueSlug(string $table, string $column, string $title, ?int $exceptId = null): string
    {
        $base = Str::slug($title) ?: 'item';
        $slug = $base;
        $n = 1;
        while (
            DB::table($table)
                ->where($column, $slug)
                ->when($exceptId !== null, fn ($q) => $q->where('id', '!=', $exceptId))
                ->exists()
        ) {
            $slug = $base.'-'.(++$n);
        }

        return $slug;
    }
}
