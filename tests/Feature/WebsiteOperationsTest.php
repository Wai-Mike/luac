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
                ->missing('homeGallery')
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
