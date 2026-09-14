<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('association_reports')) {
            return;
        }

        Schema::table('association_reports', function (Blueprint $table) {
            if (! Schema::hasColumn('association_reports', 'payload')) {
                $table->json('payload')->nullable();
            }
            if (! Schema::hasColumn('association_reports', 'submitted_on')) {
                $table->date('submitted_on')->nullable();
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('association_reports')) {
            return;
        }

        Schema::table('association_reports', function (Blueprint $table) {
            if (Schema::hasColumn('association_reports', 'payload')) {
                $table->dropColumn('payload');
            }
            if (Schema::hasColumn('association_reports', 'submitted_on')) {
                $table->dropColumn('submitted_on');
            }
        });
    }
};
