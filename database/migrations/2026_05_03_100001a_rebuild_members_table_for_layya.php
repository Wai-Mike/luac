<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Replace legacy members shape with LAYYA association member registry.
     */
    public function up(): void
    {
        Schema::dropIfExists('members');

        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('member_no')->unique();
            $table->string('full_name');
            $table->string('gender', 20)->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('state')->nullable();
            $table->string('county')->nullable();
            $table->string('payam')->nullable();
            $table->string('boma')->nullable();
            $table->string('current_location')->nullable();
            $table->string('education_level')->nullable();
            $table->string('occupation')->nullable();
            $table->string('membership_type', 32)->default('youth');
            $table->string('status', 32)->default('active');
            $table->date('joined_at')->nullable();
            $table->string('photo')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();

            $table->index(['status', 'membership_type']);
            $table->index(['gender', 'county']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');

        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('profile_image')->nullable();
            $table->string('county')->nullable();
            $table->string('payam')->nullable();
            $table->string('boma')->nullable();
            $table->string('department')->nullable();
            $table->string('department_role')->nullable();
            $table->timestamps();

            $table->index(['last_name', 'first_name']);
        });
    }
};
