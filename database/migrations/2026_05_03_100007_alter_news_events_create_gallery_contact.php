<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news_posts', function (Blueprint $table) {
            $table->text('excerpt')->nullable()->after('slug');
            $table->string('status', 32)->default('draft')->after('featured_image');
            $table->timestamp('published_at')->nullable()->after('status');
            $table->foreignId('created_by')->nullable()->after('published_at')->constrained('users')->nullOnDelete();
        });

        Schema::table('events', function (Blueprint $table) {
            if (! Schema::hasColumn('events', 'event_date')) {
                $table->dateTime('event_date')->nullable()->after('description');
            }
            if (! Schema::hasColumn('events', 'status')) {
                $table->string('status', 32)->default('upcoming')->after('location');
            }
            if (! Schema::hasColumn('events', 'created_by')) {
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            }
        });

        if (Schema::hasTable('events') && Schema::hasColumn('events', 'starts_at')) {
            DB::table('events')->whereNull('event_date')->orderBy('id')->chunkById(100, function ($rows) {
                foreach ($rows as $row) {
                    DB::table('events')->where('id', $row->id)->update(['event_date' => $row->starts_at]);
                }
            });
        }

        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('caption')->nullable();
            $table->string('image_path');
            $table->string('category')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->string('status', 32)->default('visible');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['status', 'category']);
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->string('status', 32)->default('new');
            $table->timestamps();

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('gallery_items');

        Schema::table('events', function (Blueprint $table) {
            if (Schema::hasColumn('events', 'created_by')) {
                $table->dropForeign(['created_by']);
                $table->dropColumn(['created_by', 'event_date', 'status']);
            }
        });

        Schema::table('news_posts', function (Blueprint $table) {
            if (Schema::hasColumn('news_posts', 'created_by')) {
                $table->dropForeign(['created_by']);
                $table->dropColumn(['excerpt', 'status', 'published_at', 'created_by']);
            }
        });
    }
};
