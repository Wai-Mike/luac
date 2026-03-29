<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('youth_members', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            // Location
            $table->string('county')->nullable();
            $table->string('payam')->nullable();
            $table->string('boma')->nullable();

            // Education & skills
            $table->string('education_level')->nullable();
            $table->string('current_school')->nullable();
            $table->string('employment_status')->nullable();
            $table->json('skills')->nullable();
            $table->json('interests')->nullable();

            $table->string('heard_about_layya')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('youth_members');
    }
};

