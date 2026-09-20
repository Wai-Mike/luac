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
        $programs[0]['image'] = '/images/education.jpg';

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
                ->missing('programsGallery')
                ->has('programsHeroImage')
                ->where('site.programs.0.title', 'Youth Empowerment Lab')
                ->where('site.programs.0.image', '/images/education.jpg'));

        $this->get(route('programs'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('programsHeroImage')
                ->where('site.programs.0.image', '/images/education.jpg'));
    }

    public function test_public_card_photos_are_static_and_heroes_rotate(): void
    {
        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/main/index')
                ->has('heroImage')
                ->has('heroImages')
                ->has('galleryItems')
                ->where('site.card_images.mission', '/images/youth.jpg')
                ->where('site.card_images.vision', '/images/education.jpg')
                ->where('site.card_images.tawus', '/images/cover1.jpg')
                ->where('site.campaigns.0.image', '/images/education1.jpg')
                ->where('site.campaigns.1.image', '/images/education.jpg'));

        $this->get(route('fundraising'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->has('heroImage')
                ->where('site.campaigns.0.image', '/images/education1.jpg'));
    }

    public function test_admin_can_replace_a_static_card_photo(): void
    {
        $admin = User::factory()->admin()->create();
        $cards = SiteContentRepository::defaults()['card_images'];
        $cards['mission'] = '/images/football.jpg';

        $this->actingAs($admin)
            ->put(route('admin.content.site.update'), [
                'card_images' => $cards,
                'redirect' => 'admin.content.site.edit',
            ])
            ->assertRedirect(route('admin.content.site.edit'));

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('site.card_images.mission', '/images/football.jpg')
                ->where('site.card_images.vision', '/images/education.jpg'));
    }

    public function test_admin_can_update_the_community_story_quote(): void
    {
        $admin = User::factory()->admin()->create();
        $story = SiteContentRepository::defaults()['community_story'];
        $story['quote'] = 'LAYYA trained my daughter and trusted her with real work.';
        $quotes = SiteContentRepository::defaults()['quotes'];
        $quotes[0]['quote'] = $story['quote'];

        $this->actingAs($admin)
            ->put(route('admin.content.site.update'), [
                'community_story' => $story,
                'quotes' => $quotes,
                'redirect' => 'admin.content.site.edit',
            ])
            ->assertRedirect(route('admin.content.site.edit'));

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('site.community_story.quote', $story['quote'])
                ->where('site.community_story.name', 'Angelina Nyalith Agoth'));

        $this->get(route('impact'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('site.quotes.0.quote', $story['quote']));
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
        $chairman = User::factory()->chairman()->create();
        $department = \App\Models\Department::factory()->create(['name' => 'Programs & Welfare']);

        $this->actingAs($executive)
            ->post(route('admin.operations.reports.store'), [
                'title' => 'LAYYA annual highlights',
                'period' => '2026',
                'summary' => 'Youth programs and Tawus Hub sessions.',
                'status' => 'published',
                'is_public' => true,
                'department_id' => $department->id,
            ])
            ->assertRedirect();

        $this->get(route('reports'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/reports')
                ->where('reports', fn ($reports) => collect($reports)->isEmpty()));

        $report = \App\Models\AssociationReport::query()->first();
        $this->actingAs($chairman)
            ->post(route('admin.operations.reports.approve', $report))
            ->assertRedirect();

        $this->get(route('reports'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/reports')
                ->where('reports.0.title', 'LAYYA annual highlights'));
    }

    public function test_departmental_progress_report_prints_the_chairperson_template(): void
    {
        $education = \App\Models\Department::query()->create([
            'name' => 'Education',
            'slug' => 'education-report-test',
            'status' => 'active',
            'code' => 'EDU-TEST',
        ]);
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.operations.reports.store'), [
                'title' => 'Monthly Update on Panaruu Student Association Partnership and Student Fees',
                'period' => 'June 2026',
                'summary' => 'This report provides a monthly update from the Department of Education.',
                'status' => 'draft',
                'kind' => 'departmental',
                'template' => 'monthly',
                'department_id' => $education->id,
                'submitted_on' => '2026-06-30',
                'payload' => [
                    'submitted_to' => 'The Office of the Chairperson',
                    'submitted_by' => 'Department of Education',
                    'prepared_by' => 'Nyok Lual Monyluak, Deputy Secretary for Education',
                    'purpose' => 'Provide leadership with timely departmental progress.',
                    'objectives' => 'Support newly admitted first-year students joining the University of Juba.',
                    'highlights' => 'The partnership with the Panaruu Student Association is progressing well.',
                    'financial_update' => 'The Department has paid 2,000,000 SSP to the Panaruu Student Association.',
                    'challenges' => 'Delay in receiving the official verified list from GPOC.',
                    'conclusion' => 'The Department of Education has made good progress.',
                    'metrics' => [
                        ['metric' => 'Total support paid to Panaruu Student Association', 'status' => '2,000,000 SSP'],
                    ],
                    'risks' => [
                        ['risk' => 'Delay in official verified student list', 'effect' => 'Delayed payment follow-up', 'mitigation' => 'Maintain regular follow-up with GPOC'],
                    ],
                    'actions' => [
                        ['item' => 'Follow up with GPOC on the official verified student list', 'office' => 'Department of Education', 'status' => 'Pending'],
                    ],
                    'attachment_title' => 'Official List of Newly Admitted First-Year Students',
                    'attachment_columns' => ['S/N', 'Full Name', 'School Admitted In'],
                    'attachment_rows' => [
                        ['1', 'Monyawch Monyiik Awuol', 'Pharmacy'],
                    ],
                    'cc' => [
                        'Office of the Secretary General',
                        'Office of the Finance Secretary',
                        'Office of the External Affairs Secretary',
                        'File',
                    ],
                ],
            ])
            ->assertRedirect();

        $report = \App\Models\AssociationReport::query()->first();

        $this->actingAs($admin)
            ->get(route('admin.operations.reports.show', $report))
            ->assertOk()
            ->assertSee('Luac Akook Yieu Youth Association')
            ->assertSee('Department of Education')
            ->assertSee('Monthly Departmental Progress Report')
            ->assertSee('The Office of the Chairperson')
            ->assertSee('1. Executive Summary')
            ->assertSee('4. Key Metrics and Performance Summary')
            ->assertSee('13. Approval and Submission')
            ->assertSee('Copy to Files / Cc:')
            ->assertSee('Nyok Lual Monyluak')
            ->assertSee('2,000,000 SSP')
            ->assertSee('Monyawch Monyiik Awuol')
            ->assertSee('Office of the Secretary General')
            ->assertSee($report->reference);
    }
}
