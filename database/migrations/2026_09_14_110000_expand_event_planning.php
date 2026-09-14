<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('association_events')) {
            Schema::table('association_events', function (Blueprint $table) {
                if (! Schema::hasColumn('association_events', 'kind')) {
                    $table->string('kind', 32)->default('workshop')->after('title');
                }
                if (! Schema::hasColumn('association_events', 'ends_on')) {
                    $table->date('ends_on')->nullable()->after('event_date');
                }
                if (! Schema::hasColumn('association_events', 'objectives')) {
                    $table->text('objectives')->nullable()->after('venue');
                }
                if (! Schema::hasColumn('association_events', 'kpis')) {
                    $table->text('kpis')->nullable()->after('objectives');
                }
                if (! Schema::hasColumn('association_events', 'audience')) {
                    $table->text('audience')->nullable()->after('kpis');
                }
                if (! Schema::hasColumn('association_events', 'contingency_percent')) {
                    $table->unsignedTinyInteger('contingency_percent')->default(12)->after('currency');
                }
                if (! Schema::hasColumn('association_events', 'plan')) {
                    $table->json('plan')->nullable()->after('notes');
                }
            });
        }

        if (Schema::hasTable('association_event_budget_items')) {
            Schema::table('association_event_budget_items', function (Blueprint $table) {
                if (! Schema::hasColumn('association_event_budget_items', 'elements')) {
                    $table->text('elements')->nullable()->after('category');
                }
                if (! Schema::hasColumn('association_event_budget_items', 'unit_metric')) {
                    $table->string('unit_metric')->nullable()->after('elements');
                }
                if (! Schema::hasColumn('association_event_budget_items', 'quantity')) {
                    $table->decimal('quantity', 12, 2)->nullable()->after('unit_metric');
                }
                if (! Schema::hasColumn('association_event_budget_items', 'unit_cost')) {
                    $table->decimal('unit_cost', 12, 2)->nullable()->after('quantity');
                }
            });
        }
    }

    public function down(): void
    {
        //
    }
};
