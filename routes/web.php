<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// for email verification
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

// for portfolio 
use App\Http\Controllers\PortfolioController;

// for portfolio pages
use App\Http\Controllers\PageController;

// for project
use App\Http\Controllers\ProjectController;

// for media
use App\Http\Controllers\MediaController;

// for dashboard
use Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/builder', function () {
    return Inertia::render('Builder');
})->middleware(['auth', 'verified'])->name('builder');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


// normal routes to pages
Route::inertia('/about', 'About');


// for email verification
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('/dashboard'); 
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');


// portfolio routes
Route::middleware(['auth'])->group(function () {
    Route::get('/portfolios', [PortfolioController::class, 'index'])->name('portfolios.index');
    Route::get('/portfolios/create', [PortfolioController::class, 'create'])->name('portfolios.create');
    Route::post('/portfolios', [PortfolioController::class, 'store'])->name('portfolios.store');
    Route::get('/portfolios/{portfolio}/edit', [PortfolioController::class, 'edit'])->name('portfolios.edit');
    Route::get('/portfolios/{portfolio}/builder', [PortfolioController::class, 'build'])->name('portfolios.build');
    Route::put('/portfolios/{portfolio}', [PortfolioController::class, 'update'])->name('portfolios.update');
    Route::delete('/portfolios/{portfolio}', [PortfolioController::class, 'destroy'])->name('portfolios.destroy');
    Route::get('/portfolios/{portfolio}/preview', [PortfolioController::class, 'preview'])->name('portfolios.preview');
});

// project routes
Route::middleware(['auth'])->group(function () {
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
    Route::get('/projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
    Route::get('/projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
});


// media routes
Route::middleware(['auth'])->group(function () {
    Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    Route::get('/media/create', [MediaController::class, 'create'])->name('media.create');
    Route::post('/media', [MediaController::class, 'store'])->name('media.store');
    Route::get('/media/{media}', [MediaController::class, 'show'])->name('media.show');
    Route::get('/media/{media}/edit', [MediaController::class, 'edit'])->name('media.edit');
    Route::put('/media/{media}', [MediaController::class, 'update'])->name('media.update');
    Route::delete('/media/{media}', [MediaController::class, 'destroy'])->name('media.destroy');
});


// dashboard routes
Route::get('/dashboard', function () {
    $user = Auth::user();
    
    $portfolios = $user ? $user->portfolios()
        ->with('pages') 
        ->orderBy('updated_at', 'desc')
        ->get(['id', 'title', 'description', 'industry', 'created_at', 'updated_at']) : [];

    // to get last time a page has been updated
    $portfolios->each(function ($portfolio) {
        $latestPage = $portfolio->pages->sortByDesc('updated_at')->first();
        $portfolio->last_update_time = $latestPage ? $latestPage->updated_at : $portfolio->updated_at;
    });


    $projects = $user ? $user->projects()
        ->orderBy('updated_at', 'desc')
        ->get(['id', 'title', 'description', 'started_on', 'ended_on', 'updated_at']) : [];

    $media = $user ? $user->media()
    ->with('projects')  // so that media will be shown in their respective project folders
    ->orderBy('created_at', 'desc')
    ->get(['id', 'file_name', 'file_type', 'caption', 'cloud_url', 'cloud_public_id', 'created_at']) : [];
    
    $industries = [
        // visual arts
        'graphic_design' => 'Graphic Design',
        'illustration' => 'Illustration',
        'animation' => 'Animation',

        // digital design
        'ui/ux_design' => 'UI/UX Design',
        'software_design' => 'Software Design',
        'game_design' => 'Game Design',
        '3d_art/animation' => '3D Art/Animation',

        // photography and video
        'photography' => 'Photography',
        'film_production' => 'Film Production',

        // fashion and beauty
        'fashion_design' => 'Fashion Design',

        // architecture
        'architecture' => 'Architecture',

        // branding and marketing
        'product_design' => 'Product Design',
        'content_creation' => 'Content Creation',
        'marketing' => 'Marketing',
        'social_media_management' => 'Social Media Management',

        // publishing and creative writing
        'journalism' => 'Journalism',
        'screen_writing' => 'Screen Writing',
        'creative_writing' => 'Creative Writing',

        // performance arts
        'music' => 'Music',
    ];
    
    return Inertia::render('Dashboard', [
        'portfolios' => $portfolios,
        'projects' => $projects,
        'media' => $media,  
        'industries' => $industries
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// portfolio page routes
Route::middleware(['auth'])->group(function () {
    Route::post('/pages', [PageController::class, 'store'])->name('pages.store');
    Route::put('/pages/{page}', [PageController::class, 'update'])->middleware(['auth']);
    Route::delete('/pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy');
});