<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('youth_memberships')) {
            Schema::create('youth_memberships', function (Blueprint $table) {
                $table->id();
                $table->foreignId('youth_member_id')->constrained('youth_members')->cascadeOnDelete();
                $table->unsignedSmallInteger('year');
                $table->decimal('amount_paid', 14, 2)->default(0);
                $table->string('currency', 8)->default('ssp');
                $table->timestamp('paid_at')->nullable();
                $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->text('notes')->nullable();
                $table->timestamps();

                $table->unique(['youth_member_id', 'year']);
                $table->index('year');
            });
        }

        if (! Schema::hasTable('admin_notifications')) {
            Schema::create('admin_notifications', function (Blueprint $table) {
                $table->id();
                $table->string('type', 40);
                $table->string('title');
                $table->string('body')->nullable();
                $table->string('url')->nullable();
                $table->timestamp('read_at')->nullable();
                $table->timestamps();

                $table->index(['read_at', 'created_at']);
            });
        }

        $year = (int) now()->year;
        $now = now();

        DB::table('youth_members')->orderBy('id')->chunkById(100, function ($members) use ($year, $now) {
            foreach ($members as $member) {
                DB::table('youth_memberships')->insertOrIgnore([
                    'youth_member_id' => $member->id,
                    'year' => $year,
                    'amount_paid' => 0,
                    'currency' => 'ssp',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('youth_memberships');
        Schema::dropIfExists('admin_notifications');
    }
};
