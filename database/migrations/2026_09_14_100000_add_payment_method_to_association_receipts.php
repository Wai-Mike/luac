<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('association_receipts')) {
            return;
        }

        Schema::table('association_receipts', function (Blueprint $table) {
            if (! Schema::hasColumn('association_receipts', 'payment_method')) {
                $table->string('payment_method', 32)->nullable()->after('currency');
            }
            if (! Schema::hasColumn('association_receipts', 'notes')) {
                $table->text('notes')->nullable()->after('payment_method');
            }
        });
    }

    public function down(): void
    {
        //
    }
};
