<?php

use App\Http\Controllers\Entreprise\EntrepriseController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'entreprise'])->prefix('entreprise')->name('entreprise.')->group(function () {
    Route::get('/dashboard', [EntrepriseController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [EntrepriseController::class, 'profile'])->name('profile');
    Route::put('/profile', [EntrepriseController::class, 'updateProfile'])->name('profile.update');
    
    // Les technologies seront gérées directement dans le contrôleur EntrepriseController
});