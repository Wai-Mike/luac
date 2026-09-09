<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'is_executive')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_executive')->default(false)->after('role');
            });
        }

        if (! Schema::hasTable('site_contents')) {
            Schema::create('site_contents', function (Blueprint $table) {
                $table->id();
                $table->string('key')->unique();
                $table->json('value')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('site_contents');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_executive');
        });
    }
};
