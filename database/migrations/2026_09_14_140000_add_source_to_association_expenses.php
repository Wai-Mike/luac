<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('association_expenses') || Schema::hasColumn('association_expenses', 'source_type')) {
            return;
        }

        Schema::table('association_expenses', function (Blueprint $table) {
            $table->string('source_type', 40)->nullable()->after('notes');
            $table->unsignedBigInteger('source_id')->nullable()->after('source_type');
            $table->index(['source_type', 'source_id']);
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('association_expenses') || ! Schema::hasColumn('association_expenses', 'source_type')) {
            return;
        }

        Schema::table('association_expenses', function (Blueprint $table) {
            $table->dropIndex(['source_type', 'source_id']);
            $table->dropColumn(['source_type', 'source_id']);
        });
    }
};
