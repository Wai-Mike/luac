<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('departments') && ! Schema::hasColumn('departments', 'code')) {
            Schema::table('departments', function (Blueprint $table) {
                $table->string('code', 16)->nullable()->unique();
            });
        }

        if (Schema::hasTable('purchase_requests')) {
            Schema::table('purchase_requests', function (Blueprint $table) {
                if (! Schema::hasColumn('purchase_requests', 'budget_hold')) {
                    $table->boolean('budget_hold')->default(false);
                }
                if (! Schema::hasColumn('purchase_requests', 'hold_reason')) {
                    $table->string('hold_reason')->nullable();
                }
                if (! Schema::hasColumn('purchase_requests', 'event_id')) {
                    $table->unsignedBigInteger('event_id')->nullable();
                }
            });
        }

        if (Schema::hasTable('association_reports')) {
            Schema::table('association_reports', function (Blueprint $table) {
                if (! Schema::hasColumn('association_reports', 'template')) {
                    $table->string('template', 32)->nullable();
                }
                if (! Schema::hasColumn('association_reports', 'context')) {
                    $table->text('context')->nullable();
                }
                if (! Schema::hasColumn('association_reports', 'deliverables')) {
                    $table->text('deliverables')->nullable();
                }
                if (! Schema::hasColumn('association_reports', 'challenges')) {
                    $table->text('challenges')->nullable();
                }
                if (! Schema::hasColumn('association_reports', 'attendance')) {
                    $table->text('attendance')->nullable();
                }
                if (! Schema::hasColumn('association_reports', 'financial_summary')) {
                    $table->text('financial_summary')->nullable();
                }
            });
        }

        if (Schema::hasTable('association_events')) {
            Schema::table('association_events', function (Blueprint $table) {
                if (! Schema::hasColumn('association_events', 'ticket_revenue')) {
                    $table->decimal('ticket_revenue', 12, 2)->default(0);
                }
                if (! Schema::hasColumn('association_events', 'attendance_count')) {
                    $table->unsignedInteger('attendance_count')->nullable();
                }
            });
        }

        if (! Schema::hasTable('ledger_accounts')) {
            Schema::create('ledger_accounts', function (Blueprint $table) {
                $table->id();
                $table->string('code', 16)->unique();
                $table->string('name');
                $table->string('type', 24);
                $table->boolean('is_system')->default(true);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('department_budgets')) {
            Schema::create('department_budgets', function (Blueprint $table) {
                $table->id();
                $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
                $table->unsignedSmallInteger('year');
                $table->decimal('amount', 14, 2)->default(0);
                $table->string('currency', 8)->default('SSP');
                $table->text('notes')->nullable();
                $table->timestamps();
                $table->unique(['department_id', 'year', 'currency']);
            });
        }

        if (! Schema::hasTable('ledger_journals')) {
            Schema::create('ledger_journals', function (Blueprint $table) {
                $table->id();
                $table->string('reference')->nullable();
                $table->date('posted_on');
                $table->string('memo');
                $table->string('source_type', 64);
                $table->unsignedBigInteger('source_id');
                $table->string('currency', 8)->default('SSP');
                $table->foreignId('posted_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
                $table->unique(['source_type', 'source_id', 'currency']);
            });
        }

        if (! Schema::hasTable('ledger_lines')) {
            Schema::create('ledger_lines', function (Blueprint $table) {
                $table->id();
                $table->foreignId('journal_id')->constrained('ledger_journals')->cascadeOnDelete();
                $table->foreignId('account_id')->constrained('ledger_accounts')->restrictOnDelete();
                $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
                $table->unsignedBigInteger('event_id')->nullable();
                $table->decimal('debit', 14, 2)->default(0);
                $table->decimal('credit', 14, 2)->default(0);
                $table->string('memo')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('ledger_lines');
        Schema::dropIfExists('ledger_journals');
        Schema::dropIfExists('department_budgets');
        Schema::dropIfExists('ledger_accounts');
    }
};
