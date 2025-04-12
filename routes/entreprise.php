<?php

use App\Http\Controllers\Entreprise\EntrepriseController;
use Illuminate\Support\Facades\Route;


// Routes publiques pour les offres
Route::get('/entreprises', [EntrepriseController::class, 'index'])->name('entreprises.index');
Route::get('/entresprise/{entreprise}', [EntrepriseController::class, 'show'])->name('entreprises.show');

Route::middleware(['auth', 'entreprise'])->prefix('entreprise')->group(function () {
    Route::get('/dashboard', [EntrepriseController::class, 'dashboard'])->name('entreprise.dashboard');
    Route::get('/profile', [EntrepriseController::class, 'profile'])->name('entreprise.profile');
    Route::put('/profile', [EntrepriseController::class, 'updateProfile'])->name('entreprise.profile.update');
    // Les technologies seront gérées directement dans le contrôleur EntrepriseController
});

