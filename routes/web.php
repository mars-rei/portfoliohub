<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

// or ^^
// Route::inertia('/', 'Home');

Route::inertia('/about', 'About');

Route::inertia('/documentation', 'Documentation');

Route::inertia('/register', 'Register');

Route::inertia('/dashboard', 'Dashboard');

Route::inertia('/builder', 'Builder');

Route::inertia('/settings', 'Settings');

Route::inertia('/verify', 'Verify');

Route::inertia('/welcome', 'Welcome');