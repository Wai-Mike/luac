<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('site_media')) {
            return;
        }

        Schema::create('site_media', function (Blueprint $table) {
            $table->id();
            $table->string('kind', 20);
            $table->string('title');
            $table->text('caption')->nullable();
            $table->string('category')->nullable();
            $table->string('year', 40)->nullable();
            $table->string('source', 20)->default('upload');
            $table->string('path')->nullable();
            $table->string('poster_path')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('youtube_id', 32)->nullable();
            $table->string('status', 20)->default('visible');
            $table->unsignedInteger('sort_order')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['kind', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_media');
    }
};
