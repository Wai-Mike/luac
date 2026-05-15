<?php

namespace Tests\Feature;

use App\Models\Candidate;
use App\Models\CensusSurvey;
use App\Models\Election;
use App\Models\FundraisingCampaign;
use App\Models\Member;
use App\Models\User;
use App\Models\Voter;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class LayyaApiTest extends TestCase
{
    use RefreshDatabase;

    protected function superAdmin(): User
    {
        $this->seed(RoleAndPermissionSeeder::class);
        $user = User::factory()->create([
            'email' => 'super@test.layya',
            'status' => 'active',
        ]);
        $user->assignRole('super_admin');

        return $user;
    }

    public function test_login_returns_token_and_roles(): void
    {
        $user = $this->superAdmin();

        $response = $this->postJson('/api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true);

        $this->assertNotEmpty($response->json('token'));
        $this->assertIsArray($response->json('user.roles'));
        $this->assertNotEmpty($response->json('user.roles'));
    }

    public function test_authenticated_user_can_access_api_user_alias(): void
    {
        $user = $this->superAdmin();
        Sanctum::actingAs($user);

        $this->getJson('/api/user')->assertOk()->assertJsonPath('success', true);
    }

    public function test_super_admin_can_create_member(): void
    {
        $user = $this->superAdmin();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/members', [
            'full_name' => 'Test Member',
            'gender' => 'female',
            'membership_type' => 'youth',
            'status' => 'active',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('members', [
            'full_name' => 'Test Member',
            'status' => 'active',
        ]);
    }

    public function test_donation_updates_campaign_raised_amount(): void
    {
        $user = $this->superAdmin();
        Sanctum::actingAs($user);

        $campaign = FundraisingCampaign::factory()->create([
            'created_by' => $user->id,
            'raised_amount' => 0,
        ]);

        $response = $this->postJson('/api/donations', [
            'fundraising_campaign_id' => $campaign->id,
            'donor_name' => 'Jane Donor',
            'amount' => '150.50',
            'payment_method' => 'cash',
            'donated_at' => now()->toIso8601String(),
        ]);

        $response->assertCreated();

        $campaign->refresh();
        $this->assertEquals('150.50', (string) $campaign->raised_amount);
    }

    public function test_voter_can_cast_one_vote_per_position(): void
    {
        $this->seed(RoleAndPermissionSeeder::class);

        $officer = User::factory()->create(['status' => 'active']);
        $officer->assignRole('super_admin');

        $voterUser = User::factory()->create(['status' => 'active']);
        $voterMember = Member::factory()->create(['user_id' => $voterUser->id]);

        $election = Election::query()->create([
            'title' => 'Test Election',
            'election_date' => now()->toDateString(),
            'status' => 'open',
            'created_by' => $officer->id,
        ]);

        $position = $election->positions()->create([
            'title' => 'Chair',
            'sort_order' => 0,
        ]);

        $memberA = Member::factory()->create();
        $memberB = Member::factory()->create();

        $candidateA = Candidate::query()->create([
            'election_id' => $election->id,
            'election_position_id' => $position->id,
            'member_id' => $memberA->id,
            'status' => 'approved',
        ]);

        Candidate::query()->create([
            'election_id' => $election->id,
            'election_position_id' => $position->id,
            'member_id' => $memberB->id,
            'status' => 'approved',
        ]);

        Voter::query()->create([
            'election_id' => $election->id,
            'member_id' => $voterMember->id,
            'is_verified' => true,
        ]);

        Sanctum::actingAs($voterUser);

        $ok = $this->postJson('/api/votes/cast', [
            'election_id' => $election->id,
            'election_position_id' => $position->id,
            'candidate_id' => $candidateA->id,
        ]);
        $ok->assertOk();

        $dup = $this->postJson('/api/votes/cast', [
            'election_id' => $election->id,
            'election_position_id' => $position->id,
            'candidate_id' => $candidateA->id,
        ]);
        $dup->assertStatus(422);
    }

    public function test_census_record_can_be_created(): void
    {
        $user = $this->superAdmin();
        Sanctum::actingAs($user);

        $survey = CensusSurvey::query()->create([
            'title' => '2026 Census',
            'year' => 2026,
            'start_date' => now()->toDateString(),
            'status' => 'active',
            'created_by' => $user->id,
        ]);

        $response = $this->postJson('/api/census-records', [
            'census_survey_id' => $survey->id,
            'head_of_household_name' => 'Kuol Deng',
            'county' => 'Juba',
            'needs_support' => true,
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('census_records', [
            'census_survey_id' => $survey->id,
            'head_of_household_name' => 'Kuol Deng',
        ]);
    }
}
