<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('logistics_documents')) {
            return;
        }

        Schema::table('logistics_documents', function (Blueprint $table) {
            if (! Schema::hasColumn('logistics_documents', 'reference_no')) {
                $table->string('reference_no')->nullable()->after('kind');
            }
            if (! Schema::hasColumn('logistics_documents', 'document_date')) {
                $table->date('document_date')->nullable()->after('reference_no');
            }
            if (! Schema::hasColumn('logistics_documents', 'vendor')) {
                $table->string('vendor')->nullable()->after('document_date');
            }
            if (! Schema::hasColumn('logistics_documents', 'party_from')) {
                $table->string('party_from')->nullable()->after('vendor');
            }
            if (! Schema::hasColumn('logistics_documents', 'party_to')) {
                $table->string('party_to')->nullable()->after('party_from');
            }
            if (! Schema::hasColumn('logistics_documents', 'amount')) {
                $table->decimal('amount', 12, 2)->nullable()->after('party_to');
            }
            if (! Schema::hasColumn('logistics_documents', 'currency')) {
                $table->string('currency', 8)->default('USD')->after('amount');
            }
            if (! Schema::hasColumn('logistics_documents', 'items')) {
                $table->json('items')->nullable()->after('currency');
            }
            if (! Schema::hasColumn('logistics_documents', 'details')) {
                $table->json('details')->nullable()->after('items');
            }
            if (! Schema::hasColumn('logistics_documents', 'purchase_request_id')) {
                $table->foreignId('purchase_request_id')->nullable()->after('department_id')->constrained('purchase_requests')->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        //
    }
};
