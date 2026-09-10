<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('association_expenses')) {
            return;
        }

        Schema::create('association_expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('category', 40);
            $table->string('title');
            $table->text('detail')->nullable();
            $table->decimal('amount', 14, 2);
            $table->string('currency', 8)->default('ssp');
            $table->date('spent_at');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['spent_at', 'category']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('association_expenses');
    }
};
