<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fundraising_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('target_amount', 14, 2);
            $table->decimal('raised_amount', 14, 2)->default(0);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('status', 32)->default('draft');
            $table->string('featured_image')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index('status');
        });

        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fundraising_campaign_id')->constrained()->cascadeOnDelete();
            $table->string('donor_name');
            $table->string('donor_phone')->nullable();
            $table->string('donor_email')->nullable();
            $table->decimal('amount', 14, 2);
            $table->string('payment_method', 32);
            $table->string('reference_no')->nullable();
            $table->foreignId('received_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('donated_at');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['fundraising_campaign_id', 'donated_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('donations');
        Schema::dropIfExists('fundraising_campaigns');
    }
};
