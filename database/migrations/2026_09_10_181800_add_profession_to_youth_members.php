<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('youth_members')) {
            return;
        }

        Schema::table('youth_members', function (Blueprint $table) {
            if (! Schema::hasColumn('youth_members', 'profession')) {
                $table->string('profession')->nullable()->after('employment_status');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('youth_members')) {
            return;
        }

        Schema::table('youth_members', function (Blueprint $table) {
            if (Schema::hasColumn('youth_members', 'profession')) {
                $table->dropColumn('profession');
            }
        });
    }
};
