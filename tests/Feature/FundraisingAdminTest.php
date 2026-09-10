<?php

namespace Tests\Feature;

use App\Models\Donation;
use App\Models\FundraisingCampaign;
use App\Models\User;
use App\Support\SiteContentRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FundraisingAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_record_a_donation(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.donations.store'), [
                'donor_name' => 'Akuol Deng',
                'donor_phone' => '0927 000 111',
                'program' => 'Youth Skills Training',
                'amount' => 75,
                'currency' => 'usd',
                'payment_method' => 'cash',
            ])
            ->assertRedirect(route('admin.donations.index'));

        $this->assertDatabaseHas('donations', [
            'donor_name' => 'Akuol Deng',
            'amount' => 75,
            'currency' => 'usd',
            'received_by' => $admin->id,
        ]);
    }

    public function test_admin_can_set_the_amount_needed_for_a_campaign(): void
    {
        $admin = User::factory()->admin()->create();
        $campaigns = SiteContentRepository::defaults()['campaigns'];
        $campaigns[0]['target'] = 40000;
        $campaigns[0]['target_ssp'] = 900000;

        $this->actingAs($admin)
            ->put(route('admin.donations.campaigns.update'), ['campaigns' => $campaigns])
            ->assertRedirect(route('admin.donations.index'));

        $this->assertDatabaseHas('fundraising_campaigns', [
            'title' => $campaigns[0]['title'],
            'target_amount' => 40000,
        ]);

        $this->get(route('fundraising'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('site.campaigns.0.target', 40000)
                ->where('site.campaigns.0.target_ssp', 900000)
                ->has('raisedByProgram')
                ->has('raisedSspByProgram'));
    }

    public function test_admin_can_export_donor_names_and_amounts_to_excel(): void
    {
        $admin = User::factory()->admin()->create();
        $campaign = FundraisingCampaign::factory()->create(['title' => 'Youth Skills Training']);
        Donation::factory()->create([
            'fundraising_campaign_id' => $campaign->id,
            'donor_name' => 'Akuol Deng',
            'amount' => 50,
            'currency' => 'usd',
            'amount_usd' => 50,
        ]);

        $response = $this->actingAs($admin)->get(route('admin.donations.export'));

        $response->assertOk();
        $response->assertHeader('content-disposition');
        $this->assertStringContainsString('Akuol Deng', $response->streamedContent());
        $this->assertStringContainsString('50', $response->streamedContent());
        $this->assertStringContainsString('Donor name', $response->streamedContent());
    }
}
