<?php

use App\Http\Controllers\Entreprise\EntrepriseController;
use App\Http\Controllers\Offre\OffreEmploiController;
use App\Http\Controllers\Offre\ApplicationController;
use Illuminate\Support\Facades\Route;

// Routes publiques pour les offres
Route::get('/offres', [OffreEmploiController::class, 'index'])->name('offres.index');
Route::get('/offres/{offre}', [OffreEmploiController::class, 'show'])->name('offres.show');
// Routes pour les entreprises
Route::middleware(['auth', 'entreprise'])->prefix('entreprise')->group(function () {

    Route::resource('offres', OffreEmploiController::class)->except(['index', 'show']);
    Route::post('/post/offre', [OffreEmploiController::class, 'store'])->name('entreprise.offres.store');
    Route::get('/mes-offres', [OffreEmploiController::class, 'mesOffres'])->name('entreprise.mes-offres');
    Route::get('/offres/{offre}/applications', [ApplicationController::class, 'index'])->name('entreprise.offres.applications.index');
    Route::get('/offres/{offre}/applications/{application}', [ApplicationController::class, 'show'])->name('entreprise.offres.applications.show');

    Route::get('/ajouterOffre', [EntrepriseController::class, 'addOffre'])->name('entreprise.addOffre');


});

// Routes pour les candidats
Route::middleware(['auth', 'candidat'])->group(function () {
    Route::post('/offres/{offre}/apply', [ApplicationController::class, 'store'])->name('offres.apply');
});