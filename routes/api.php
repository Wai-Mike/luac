<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CandidateController;
use App\Http\Controllers\Api\CastVoteController;
use App\Http\Controllers\Api\CensusRecordController;
use App\Http\Controllers\Api\CensusSurveyController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\ElectionController;
use App\Http\Controllers\Api\ElectionPositionController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\FundraisingCampaignController;
use App\Http\Controllers\Api\GalleryItemController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\NewsPostController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\ProgramParticipantController;
use App\Http\Controllers\Api\Public\PublicEventController;
use App\Http\Controllers\Api\Public\PublicGalleryController;
use App\Http\Controllers\Api\Public\PublicNewsPostController;
use App\Http\Controllers\Api\Public\PublicProgramController;
use App\Http\Controllers\Api\StaffController;
use App\Http\Controllers\Api\VoterController;
use Illuminate\Support\Facades\Route;

Route::get('public/programs', [PublicProgramController::class, 'index']);
Route::get('public/news', [PublicNewsPostController::class, 'index']);
Route::get('public/events', [PublicEventController::class, 'index']);
Route::get('public/gallery', [PublicGalleryController::class, 'index']);

Route::post('contact-messages', [ContactMessageController::class, 'store']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('auth/google', [GoogleAuthController::class, 'login']);
Route::get('google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
Route::post('google/callback', [GoogleAuthController::class, 'handleGoogleCallbackWithCode']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'profile']);
    Route::get('profile', [AuthController::class, 'profile']);
    Route::put('profile', [AuthController::class, 'updateProfile']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout-all', [AuthController::class, 'logoutAll']);
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::get('dashboard', DashboardController::class);

    Route::apiResource('members', MemberController::class);
    Route::apiResource('staff', StaffController::class);
    Route::apiResource('programs', ProgramController::class);
    Route::apiResource('programs.participants', ProgramParticipantController::class);
    Route::apiResource('fundraising-campaigns', FundraisingCampaignController::class);
    Route::apiResource('donations', DonationController::class);

    Route::get('census-surveys/{census_survey}/summary', [CensusSurveyController::class, 'summary']);
    Route::apiResource('census-surveys', CensusSurveyController::class);
    Route::apiResource('census-records', CensusRecordController::class);

    Route::get('elections/{election}/results', [ElectionController::class, 'results']);
    Route::post('elections/{election}/close', [ElectionController::class, 'close']);
    Route::post('elections/{election}/publish-results', [ElectionController::class, 'publishResults']);
    Route::apiResource('elections', ElectionController::class);
    Route::apiResource('elections.positions', ElectionPositionController::class);
    Route::apiResource('candidates', CandidateController::class);
    Route::apiResource('voters', VoterController::class);
    Route::post('votes/cast', CastVoteController::class);

    Route::apiResource('news-posts', NewsPostController::class);
    Route::apiResource('events', EventController::class);
    Route::apiResource('gallery-items', GalleryItemController::class);
    Route::apiResource('contact-messages', ContactMessageController::class)->except(['store']);
});
