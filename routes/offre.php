<?php

use App\Http\Controllers\Offre\OffreEmploiController;
use App\Http\Controllers\Offre\ApplicationController;
use Illuminate\Support\Facades\Route;

// Routes publiques pour les offres
Route::get('/offres', [OffreEmploiController::class, 'index'])->name('offres.index');
Route::get('/offres/{offre}', [OffreEmploiController::class, 'show'])->name('offres.show');

// Routes pour les entreprises
Route::middleware(['auth', 'entreprise'])->prefix('entreprise')->name('entreprise.')->group(function () {
    Route::resource('offres', OffreEmploiController::class)->except(['index', 'show']);
    Route::get('/mes-offres', [OffreEmploiController::class, 'mesOffres'])->name('mes-offres');
    Route::get('/offres/{offre}/applications', [ApplicationController::class, 'index'])->name('offres.applications.index');
    Route::get('/offres/{offre}/applications/{application}', [ApplicationController::class, 'show'])->name('offres.applications.show');
});

// Routes pour les candidats
Route::middleware(['auth', 'candidat'])->group(function () {
    Route::post('/offres/{offre}/apply', [ApplicationController::class, 'store'])->name('offres.apply');
});