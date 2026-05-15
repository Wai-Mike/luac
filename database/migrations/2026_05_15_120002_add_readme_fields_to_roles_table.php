<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->foreignId('department_id')
                ->nullable()
                ->after('id')
                ->constrained('departments')
                ->nullOnDelete();
            $table->string('slug')->nullable()->unique()->after('display_name');
            $table->unsignedTinyInteger('level')->default(0)->after('description');
            $table->string('status', 20)->default('active')->after('level');
            $table->softDeletes()->after('updated_at');
        });
    }

    public function down(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropForeign(['department_id']);
            $table->dropColumn(['department_id', 'slug', 'level', 'status']);
        });
    }
};
