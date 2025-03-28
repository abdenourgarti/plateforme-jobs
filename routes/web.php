<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return inertia('Home');
});

// Routes d'authentification
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('auth/{provider}', [SocialiteController::class, 'redirectToProvider']);
    Route::get('auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback']);



    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});




Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    // Vos routes protégées ici
});

Route::get('/jobs/jobpage', function () {
    return Inertia::render('client/JobPage');
})->name('jobs.page');

Route::get('/jobs/companies', function () {
    return Inertia::render('client/Companies');
})->name('companies.page');

Route::get('/companies/companiesdetails', function () {
    return Inertia::render('client/CompanyDetails');
})->name('companiesDetails.page');




Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return inertia('Dashboard');
    })->name('dashboard');
});
