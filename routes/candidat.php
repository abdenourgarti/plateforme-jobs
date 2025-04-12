<?php

use App\Http\Controllers\Candidat\CandidatController;
use App\Http\Controllers\Candidat\CompetenceController;
use App\Http\Controllers\Candidat\ExperienceController;
use App\Http\Controllers\Candidat\EducationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'candidat'])->prefix('candidat')->group(function () {
    Route::get('/dashboard', [CandidatController::class, 'dashboard'])->name('candidat.dashboard');
    Route::get('/profile', [CandidatController::class, 'profile'])->name('candidat.profile');
    Route::put('/profile', [CandidatController::class, 'updateProfile'])->name('candidat.profile.update');
    Route::get('/settings', [CandidatController::class, 'settings'])->name('candidat.settings');
    Route::put('/settings/profile', [CandidatController::class, 'updateSettings'])->name('candidat.settings.update');
    Route::put('/settings/password', [CandidatController::class, 'updatePassword'])->name('candidat.settings.password.update');
    Route::put('/settings/email', [CandidatController::class, 'updateEmail'])->name('candidat.settings.email.update');
    
    // Gestion des compétences, expériences et éducations seront gérées directement dans le controller CandidatController
    Route::get('/applications', [CandidatController::class, 'applications'])->name('candidat.applications');
});

// Route::middleware('auth')->group(function () {
//     Route::get('/dashboard', function () {
//         return inertia('Dashboard');
//     })->name('dashboard');
// });
