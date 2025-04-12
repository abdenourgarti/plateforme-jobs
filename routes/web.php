<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SocialiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__.'/candidat.php';
require __DIR__.'/entreprise.php';
require __DIR__.'/offre.php';
require __DIR__.'/admin.php';


Route::get('/', [HomeController::class, 'index'])->name('home');


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


Route::get('/companies/companiesdetails/companyjobsdetails', function () {
    return Inertia::render('client/CompanyJobDetails'); 
})->name('CompanyJobDetails.page');


Route::get('/admin/dashboard', function () {
    return Inertia::render('admin/Dashboard');
})->name('admin.dashboard');

Route::get('/admincompany/dashboard', function () {
    return Inertia::render('AdminCompany/Dashboard');
})->name('admincompany.dashboard');

Route::get('/admincompany/settings', function () {
    return Inertia::render('AdminCompany/Settings');
})->name('admincompany.Settings');



Route::get('/admincompany/postjob', function () {
    return Inertia::render('AdminCompany/PostJob');
})->name('admincompany.postjob');


Route::get('/admin/findjob', function () {
    return Inertia::render('admin/FindJob');
})->name('admin.findjob');




Route::get('/admin/profile', function () {
    return Inertia::render('admin/ProfilePage');
})->name('admin.profile');


Route::get('/admin/settings', function () {
    return Inertia::render('admin/Settings');
})->name('admin.Settings');


Route::get('/admin/companydetail', function () {
    return Inertia::render('admin/CompanyDetail');
})->name('admin.companydetail');



Route::get('/admin/browscompany', function () {
    return Inertia::render('admin/BrowsCompany');
})->name('admin.browsCompany');

Route::get('/admin/companyapp', function () {
    return Inertia::render('admin/CompanyApp');
})->name('admin.companyapp');


Route::get('/admin/logindetails', function () {
    return Inertia::render('admin/LoginDetails');
})->name('admin.logindetails');


