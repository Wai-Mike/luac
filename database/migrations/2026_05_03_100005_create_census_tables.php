<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('census_surveys', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('year');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('status', 32)->default('draft');
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['year', 'status']);
        });

        Schema::create('census_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('census_survey_id')->constrained()->cascadeOnDelete();
            $table->string('household_code')->nullable();
            $table->string('head_of_household_name');
            $table->string('gender', 20)->nullable();
            $table->unsignedTinyInteger('age')->nullable();
            $table->string('phone')->nullable();
            $table->string('state')->nullable();
            $table->string('county')->nullable();
            $table->string('payam')->nullable();
            $table->string('boma')->nullable();
            $table->unsignedInteger('household_size')->default(1);
            $table->unsignedInteger('male_count')->default(0);
            $table->unsignedInteger('female_count')->default(0);
            $table->unsignedInteger('youth_count')->default(0);
            $table->unsignedInteger('children_count')->default(0);
            $table->unsignedInteger('elderly_count')->default(0);
            $table->unsignedInteger('disabled_count')->default(0);
            $table->string('education_level')->nullable();
            $table->string('occupation')->nullable();
            $table->boolean('needs_support')->default(false);
            $table->text('support_needs')->nullable();
            $table->foreignId('collected_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['census_survey_id', 'county']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('census_records');
        Schema::dropIfExists('census_surveys');
    }
};
