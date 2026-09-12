<?php

namespace Tests\Feature;

use App\Models\Donation;
use App\Models\FundraisingCampaign;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GuestDonationTest extends TestCase
{
    use RefreshDatabase;

    public function test_fundraising_page_is_available(): void
    {
        $this->get(route('fundraising'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/fundraising')
                ->has('raisedByProgram')
                ->has('raisedSspByProgram')
                ->where('site.campaigns.0.target', 25000));
    }

    public function test_guest_can_submit_a_donation(): void
    {
        $this->post(route('fundraising.donate'), [
            'name' => 'Akuol Deng',
            'phone' => '0927 000 111',
            'email' => 'akuol@example.com',
            'program' => 'Youth Skills Training',
            'amount' => 50,
            'currency' => 'usd',
            'payment_method' => 'mobile_money',
            'notes' => 'For the next cohort',
        ])->assertRedirect(route('fundraising.thank-you'));

        $this->assertDatabaseHas('donations', [
            'donor_name' => 'Akuol Deng',
            'donor_phone' => '0927 000 111',
            'amount' => 50,
            'currency' => 'usd',
            'payment_method' => 'mobile_money',
        ]);

        $campaign = FundraisingCampaign::query()->where('title', 'Youth Skills Training')->first();
        $this->assertNotNull($campaign);
        $this->assertEquals('50.00', (string) $campaign->raised_amount);
        $this->assertEquals(1, Donation::query()->count());
    }

    public function test_guest_can_donate_in_south_sudanese_pounds(): void
    {
        $this->post(route('fundraising.donate'), [
            'name' => 'Jok Wuor',
            'phone' => '0927 000 222',
            'program' => 'Support 12 girls with materials',
            'amount' => 3500,
            'currency' => 'ssp',
            'payment_method' => 'cash',
        ])->assertRedirect(route('fundraising.thank-you'));

        $this->assertDatabaseHas('donations', [
            'donor_name' => 'Jok Wuor',
            'amount' => 3500,
            'currency' => 'ssp',
            'amount_usd' => 1,
        ]);
    }

    public function test_donation_requires_name_amount_and_program(): void
    {
        $this->from(route('fundraising'))
            ->post(route('fundraising.donate'), [])
            ->assertRedirect(route('fundraising'))
            ->assertSessionHasErrors(['name', 'phone', 'program', 'amount', 'currency', 'payment_method']);
    }

    public function test_thank_you_page_is_available(): void
    {
        $this->get(route('fundraising.thank-you'))->assertOk();
    }
}
