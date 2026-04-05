<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Align users.role with member | management | admin (migrate legacy user -> member).
     */
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('member','management','admin','user') NOT NULL DEFAULT 'member'");
            DB::table('users')->where('role', 'user')->update(['role' => 'member']);
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('member','management','admin') NOT NULL DEFAULT 'member'");

            return;
        }

        if ($driver === 'sqlite') {
            DB::table('users')->where('role', 'user')->update(['role' => 'member']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'mysql') {
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('member','management','admin','user') NOT NULL DEFAULT 'member'");
            DB::table('users')->whereIn('role', ['member', 'management'])->update(['role' => 'user']);
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('user','admin') NOT NULL DEFAULT 'user'");
        }

        if ($driver === 'sqlite') {
            DB::table('users')->whereIn('role', ['member', 'management'])->update(['role' => 'user']);
        }
    }
};
