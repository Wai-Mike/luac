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
            if (! Schema::hasColumn('youth_members', 'source')) {
                $table->string('source', 20)->default('census')->after('heard_about_layya');
            }
            if (! Schema::hasColumn('youth_members', 'reported_age')) {
                $table->unsignedTinyInteger('reported_age')->nullable()->after('date_of_birth');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('youth_members')) {
            return;
        }

        Schema::table('youth_members', function (Blueprint $table) {
            if (Schema::hasColumn('youth_members', 'source')) {
                $table->dropColumn('source');
            }
            if (Schema::hasColumn('youth_members', 'reported_age')) {
                $table->dropColumn('reported_age');
            }
        });
    }
};
