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

Route::inertia('/documentation', 'Documentation');


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
    Route::get('/portfolios/{portfolio}', [PortfolioController::class, 'show'])->name('portfolios.show');
    Route::get('/portfolios/{portfolio}/edit', [PortfolioController::class, 'edit'])->name('portfolios.edit');
    Route::put('/portfolios/{portfolio}', [PortfolioController::class, 'update'])->name('portfolios.update');
    Route::delete('/portfolios/{portfolio}', [PortfolioController::class, 'destroy'])->name('portfolios.destroy');
    
    // builder routes
    // Route::get('/portfolios/{portfolio}/build', [PortfolioController::class, 'build'])->name('portfolios.build');
    // Route::post('/portfolios/{portfolio}/save-code', [PortfolioController::class, 'saveCode'])->name('portfolios.save-code');
    // Route::post('/portfolios/{portfolio}/toggle-publish', [PortfolioController::class, 'togglePublish'])->name('portfolios.toggle-publish');
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
        ->orderBy('updated_at', 'desc')
        ->get(['id', 'title', 'description', 'industry', 'publish_status', 'created_at', 'updated_at']) : [];

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
        // 'comic_art' => 'Comic Art',
        // 'concept_art' => 'Concept Art',

        // digital design
        'ui/ux_design' => 'UI/UX Design',
        // 'web_design' => 'Web Design',
        //'app_design' => 'App Design',
        'software_design' => 'Software Design',
        'game_design' => 'Game Design',
        // 'motion_graphics' => 'Motion Graphics',
        '3d_art/animation' => '3D Art/Animation',

        // photography and video
        'photography' => 'Photography',
        // 'videography' => 'videography',
        'film_production' => 'Film Production',
        // 'cinematography' => 'Cinematography',

        // fashion and beauty
        'fashion_design' => 'Fashion Design',
        // 'textile_design' => 'Textile Design',
        // 'costume_design' => 'Costume Design',
        // 'makeup_artistry' => 'Makeup Artistry',
        // 'hair_styling' => 'Hair Styling',
        // 'jewellery_design' => 'Jewellery Design',

        // architecture
        'architecture' => 'Architecture',
        // 'interior_design' => 'Interior Design',
        // 'landscape_architecture' => 'Landscape Architecture',

        // branding and marketing
        'product_design' => 'Product Design',
        // 'brand_strategy' => 'Brand Strategy',
        'content_creation' => 'Content Creation',
        'marketing' => 'Marketing',
        'social_media_management' => 'Social Media Management',

        // publishing and creative writing
        'journalism' => 'Journalism',
        'screen_writing' => 'Screen Writing',
        'creative_writing' => 'Creative Writing',

        // crafts and trades
        // 'ceramics' => 'Ceramics',
        // 'woodworking' => 'Woodworking',
        // 'metalworking' => 'Metalworking',
        // 'glass_art' => 'Glass Art',
        // 'furniture_making' => 'Furniture Making',
        // 'tattoo_artistry' => 'Tattoo Artistry',

        // culinary arts
        // 'culinary_arts' => 'Culinary Arts',
        // 'pastry_arts' => 'Pastry Arts',

        // performance arts
        // 'dance' => 'Dance',
        // 'theatre' => 'Theatre',
        'music' => 'Music',
        // 'choreography' => 'Choreography',
    ];
    
    return Inertia::render('Dashboard', [
        'portfolios' => $portfolios,
        'projects' => $projects,
        'media' => $media,  
        'industries' => $industries
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');