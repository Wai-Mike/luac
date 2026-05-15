<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('full_name');
            $table->string('position');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('photo')->nullable();
            $table->text('bio')->nullable();
            $table->string('status', 20)->default('active');
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index('status');
        });

        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('category', 64);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('status', 32)->default('planned');
            $table->string('featured_image')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['status', 'category']);
        });

        Schema::create('program_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->cascadeOnDelete();
            $table->foreignId('member_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('gender', 20)->nullable();
            $table->unsignedTinyInteger('age')->nullable();
            $table->string('role', 32)->default('participant');
            $table->timestamps();

            $table->index('program_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('program_participants');
        Schema::dropIfExists('programs');
        Schema::dropIfExists('staff');
    }
};
