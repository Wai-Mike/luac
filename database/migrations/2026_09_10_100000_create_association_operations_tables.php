<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('association_reports')) {
            Schema::create('association_reports', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('period')->nullable();
                $table->text('summary')->nullable();
                $table->longText('body')->nullable();
                $table->string('status')->default('draft');
                $table->boolean('is_public')->default(false);
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('association_meetings')) {
            Schema::create('association_meetings', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('agenda')->nullable();
                $table->string('location')->nullable();
                $table->dateTime('starts_at');
                $table->dateTime('ends_at')->nullable();
                $table->string('status')->default('scheduled');
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('association_meeting_attendees')) {
            Schema::create('association_meeting_attendees', function (Blueprint $table) {
                $table->id();
                $table->foreignId('meeting_id')->constrained('association_meetings')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->timestamps();
                $table->unique(['meeting_id', 'user_id']);
            });
        }

        if (! Schema::hasTable('association_tasks')) {
            Schema::create('association_tasks', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('description')->nullable();
                $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('assigned_by')->nullable()->constrained('users')->nullOnDelete();
                $table->date('due_on')->nullable();
                $table->string('priority')->default('normal');
                $table->string('status')->default('open');
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('association_tasks');
        Schema::dropIfExists('association_meeting_attendees');
        Schema::dropIfExists('association_meetings');
        Schema::dropIfExists('association_reports');
    }
};
