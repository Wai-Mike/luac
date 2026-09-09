<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'is_chairman')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_chairman')->default(false)->after('is_executive');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'is_chairman')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('is_chairman');
            });
        }
    }
};
