<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('auth/google', [GoogleAuthController::class, 'login']);
Route::get('google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
Route::post('google/callback', [GoogleAuthController::class, 'handleGoogleCallbackWithCode']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::put('profile', [AuthController::class, 'updateProfile']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout-all', [AuthController::class, 'logoutAll']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});
