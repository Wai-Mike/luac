<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\SiteContentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WebsiteOperationsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_update_programs_and_they_appear_on_the_public_page(): void
    {
        $admin = User::factory()->admin()->create();
        $programs = SiteContentRepository::defaults()['programs'];
        $programs[0]['title'] = 'Youth Empowerment Lab';

        $this->actingAs($admin)
            ->put(route('admin.content.site.update'), [
                'programs' => $programs,
                'redirect' => 'admin.programs.index',
            ])
            ->assertRedirect(route('admin.programs.index'));

        $this->get(route('programs'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/programs')
                ->where('site.programs.0.title', 'Youth Empowerment Lab'));
    }

    public function test_executive_can_schedule_a_meeting_and_assign_a_task(): void
    {
        $executive = User::factory()->executive()->create();
        $assignee = User::factory()->admin()->create(['name' => 'Nyadak Suzan']);

        $this->actingAs($executive)
            ->post(route('admin.operations.meetings.store'), [
                'title' => 'Council briefing',
                'agenda' => 'Census update',
                'location' => 'Executive office',
                'starts_at' => now()->addDay()->toDateTimeString(),
                'attendee_ids' => [$assignee->id],
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('association_meetings', [
            'title' => 'Council briefing',
            'created_by' => $executive->id,
        ]);

        $this->actingAs($executive)
            ->post(route('admin.operations.tasks.store'), [
                'title' => 'Prepare speaker notes',
                'description' => 'One-page brief for the Speaker.',
                'assigned_to' => $assignee->id,
                'due_on' => now()->addWeek()->toDateString(),
                'priority' => 'high',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('association_tasks', [
            'title' => 'Prepare speaker notes',
            'assigned_to' => $assignee->id,
            'assigned_by' => $executive->id,
        ]);
    }

    public function test_published_report_appears_on_the_public_reports_page(): void
    {
        $executive = User::factory()->executive()->create();

        $this->actingAs($executive)
            ->post(route('admin.operations.reports.store'), [
                'title' => 'LAYYA annual highlights',
                'period' => '2026',
                'summary' => 'Youth programs and Tawus Hub sessions.',
                'status' => 'published',
                'is_public' => true,
            ])
            ->assertRedirect();

        $this->get(route('reports'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/reports')
                ->where('reports.0.title', 'LAYYA annual highlights'));
    }
}
