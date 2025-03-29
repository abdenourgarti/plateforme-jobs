<?php

use App\Http\Controllers\Candidat\CandidatController;
use App\Http\Controllers\Candidat\CompetenceController;
use App\Http\Controllers\Candidat\ExperienceController;
use App\Http\Controllers\Candidat\EducationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'candidat'])->prefix('candidat')->name('candidat.')->group(function () {
    Route::get('/dashboard', [CandidatController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [CandidatController::class, 'profile'])->name('profile');
    Route::put('/profile', [CandidatController::class, 'updateProfile'])->name('profile.update');
    
    // Gestion des compétences, expériences et éducations seront gérées directement dans le controller CandidatController
    Route::get('/applications', [CandidatController::class, 'applications'])->name('applications');
});