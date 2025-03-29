<?php

use App\Http\Controllers\Admin\DomaineController;
use App\Http\Controllers\Admin\CategorieController;
use App\Http\Controllers\Admin\DemandeInscriptionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('Admin/Dashboard');
    })->name('dashboard');
    
    Route::resource('domaines', DomaineController::class);
    Route::resource('categories', CategorieController::class);
    
    Route::get('/demandes', [DemandeInscriptionController::class, 'index'])->name('demandes.index');
    Route::post('/demandes/{demande}/accept', [DemandeInscriptionController::class, 'accept'])->name('demandes.accept');
    Route::post('/demandes/{demande}/reject', [DemandeInscriptionController::class, 'reject'])->name('demandes.reject');
});

