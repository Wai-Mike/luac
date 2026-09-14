<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('users') && ! Schema::hasColumn('users', 'office')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('office', 64)->nullable()->after('department_id');
            });
        }

        if (Schema::hasTable('departments') && ! Schema::hasColumn('departments', 'head_id')) {
            Schema::table('departments', function (Blueprint $table) {
                $table->foreignId('head_id')->nullable()->after('status')->constrained('users')->nullOnDelete();
            });
        }

        if (Schema::hasTable('association_reports')) {
            Schema::table('association_reports', function (Blueprint $table) {
                if (! Schema::hasColumn('association_reports', 'kind')) {
                    $table->string('kind', 32)->default('departmental')->after('status');
                }
                if (! Schema::hasColumn('association_reports', 'approval_status')) {
                    $table->string('approval_status', 32)->default('pending')->after('kind');
                }
                if (! Schema::hasColumn('association_reports', 'file_path')) {
                    $table->string('file_path')->nullable()->after('body');
                }
                if (! Schema::hasColumn('association_reports', 'file_name')) {
                    $table->string('file_name')->nullable()->after('file_path');
                }
                if (! Schema::hasColumn('association_reports', 'department_id')) {
                    $table->foreignId('department_id')->nullable()->after('created_by')->constrained('departments')->nullOnDelete();
                }
                if (! Schema::hasColumn('association_reports', 'approved_by')) {
                    $table->foreignId('approved_by')->nullable()->after('department_id')->constrained('users')->nullOnDelete();
                }
            });

            DB::table('association_reports')
                ->where('is_public', true)
                ->where('status', 'published')
                ->update(['approval_status' => 'approved', 'kind' => 'association']);
        }

        if (Schema::hasTable('association_meetings')) {
            Schema::table('association_meetings', function (Blueprint $table) {
                if (! Schema::hasColumn('association_meetings', 'notes')) {
                    $table->text('notes')->nullable()->after('agenda');
                }
                if (! Schema::hasColumn('association_meetings', 'department_id')) {
                    $table->foreignId('department_id')->nullable()->after('created_by')->constrained('departments')->nullOnDelete();
                }
            });
        }

        if (Schema::hasTable('association_tasks')) {
            Schema::table('association_tasks', function (Blueprint $table) {
                if (! Schema::hasColumn('association_tasks', 'meeting_id')) {
                    $table->foreignId('meeting_id')->nullable()->after('assigned_by')->constrained('association_meetings')->nullOnDelete();
                }
                if (! Schema::hasColumn('association_tasks', 'event_id')) {
                    $table->unsignedBigInteger('event_id')->nullable()->after('meeting_id');
                }
                if (! Schema::hasColumn('association_tasks', 'is_delegation')) {
                    $table->boolean('is_delegation')->default(false)->after('priority');
                }
                if (! Schema::hasColumn('association_tasks', 'department_id')) {
                    $table->foreignId('department_id')->nullable()->after('is_delegation')->constrained('departments')->nullOnDelete();
                }
            });
        }

        if (! Schema::hasTable('association_events')) {
            Schema::create('association_events', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->date('event_date')->nullable();
                $table->string('venue')->nullable();
                $table->decimal('total_budget', 12, 2)->default(0);
                $table->string('currency', 8)->default('USD');
                $table->text('program_outline')->nullable();
                $table->text('notes')->nullable();
                $table->string('status', 32)->default('planning');
                $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('association_event_budget_items')) {
            Schema::create('association_event_budget_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('event_id')->constrained('association_events')->cascadeOnDelete();
                $table->string('category');
                $table->decimal('amount', 12, 2)->default(0);
                $table->string('notes')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('association_event_committee')) {
            Schema::create('association_event_committee', function (Blueprint $table) {
                $table->id();
                $table->foreignId('event_id')->constrained('association_events')->cascadeOnDelete();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->string('role')->nullable();
                $table->timestamps();
                $table->unique(['event_id', 'user_id']);
            });
        }

        if (! Schema::hasTable('purchase_requests')) {
            Schema::create('purchase_requests', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('purpose')->nullable();
                $table->decimal('amount', 12, 2)->default(0);
                $table->string('currency', 8)->default('USD');
                $table->string('status', 32)->default('submitted');
                $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
                $table->foreignId('requested_by')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
                $table->foreignId('paid_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamp('reviewed_at')->nullable();
                $table->timestamp('approved_at')->nullable();
                $table->timestamp('paid_at')->nullable();
                $table->text('review_notes')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('purchase_request_items')) {
            Schema::create('purchase_request_items', function (Blueprint $table) {
                $table->id();
                $table->foreignId('purchase_request_id')->constrained('purchase_requests')->cascadeOnDelete();
                $table->string('description');
                $table->unsignedInteger('quantity')->default(1);
                $table->decimal('unit_cost', 12, 2)->default(0);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('association_receipts')) {
            Schema::create('association_receipts', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('vendor')->nullable();
                $table->decimal('amount', 12, 2)->default(0);
                $table->string('currency', 8)->default('USD');
                $table->string('file_path')->nullable();
                $table->string('file_name')->nullable();
                $table->foreignId('purchase_request_id')->nullable()->constrained('purchase_requests')->nullOnDelete();
                $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
                $table->foreignId('recorded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->date('received_on')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('logistics_documents')) {
            Schema::create('logistics_documents', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('kind', 64);
                $table->string('file_path')->nullable();
                $table->string('file_name')->nullable();
                $table->text('notes')->nullable();
                $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('logistics_documents');
        Schema::dropIfExists('association_receipts');
        Schema::dropIfExists('purchase_request_items');
        Schema::dropIfExists('purchase_requests');
        Schema::dropIfExists('association_event_committee');
        Schema::dropIfExists('association_event_budget_items');
        Schema::dropIfExists('association_events');
    }
};
