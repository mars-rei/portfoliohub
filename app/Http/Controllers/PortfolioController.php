<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Http\Requests\StorePortfolioRequest;
use App\Http\Requests\UpdatePortfolioRequest;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Models\Page;

class PortfolioController extends Controller
{
    // for when a portfolio is newly made
    public function build(Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        // load pages with portfolio
        $portfolio->load('pages');

        // get user's projects and project media to place in builder
        $projects = Auth::user()->projects()
            ->with('media')
            ->get(['id', 'title']);

        return Inertia::render('Builder', [
            'portfolio' => $portfolio,
            'projects' => $projects,
        ]);
    }

    // display user's portfolios
    public function index()
    {
        $portfolios = Auth::user()->portfolios()
            ->orderBy('updated_at', 'desc')
            ->get(['id', 'title', 'industry', 'updated_at']);

        return Inertia::render('Portfolios/Index', [
            'portfolios' => $portfolios
        ]);
    }

    // show portfolio creation form
    public function create()
    {
        // check if user has more than the maximum number of portfolios
        $portfolioCount = Auth::user()->portfolios()->count();
        
        if ($portfolioCount >= 3) {
            return redirect()->route('portfolios.index')
                ->with('error', 'You have reached the maximum limit of 3 portfolios.');
        }

        // industries dropdown
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

        return Inertia::render('Portfolios/Create', [
            'industries' => $industries
        ]);
    }

    // store newly created portfolio
    public function store(StorePortfolioRequest $request)
    {
        // check if user has more than the maximum number of portfolios
        $portfolioCount = Auth::user()->portfolios()->count();
        
        if ($portfolioCount >= 3) {
            return redirect()->back()->with('error', 'You can only create up to 3 portfolios.');
        }

        $validated = $request->validated();
        
        $validated['user_id'] = Auth::id();

        $validated['canvas_colour'] = '#1d2025';

        $portfolio = Portfolio::create($validated);


        // create a portfolio page with default values
        $defaultPageData = [
            'name' => 'Home',
            'colour' => '#B5446E',
            'items' => [],
            'itemStyles' => new \stdClass(), 
            'dimensions' => [
                'width' => 1920,
                'height' => 1080
            ]
        ];

        $page = new Page();
        $page->portfolio_id = $portfolio->id;
        $page->page_name = 'Home';
        $page->code = $defaultPageData;
        $page->save(); // inserts new page record into database


        return redirect()->route('dashboard')
            ->with('success', 'Portfolio created successfully!');
    }

    // for previewing portfolios - to come back to
    public function preview(Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        $portfolio->load('pages');
        
        $canvasColour = $portfolio->canvas_colour ?? '#1d2025';
        
        $pages = $portfolio->pages->map(function ($page) {
            $pageData = $page->code;
            
            return [
                'id' => $page->id,
                'name' => $page->page_name,
                'colour' => $pageData['colour'] ?? '#B5446E',
                'dimensions' => $pageData['dimensions'] ?? ['width' => 1920, 'height' => 1080],
                'items' => $pageData['items'] ?? [],
                'itemStyles' => $pageData['itemStyles'] ?? new \stdClass(),
            ];
        });

        return Inertia::render('Portfolios/Preview', [
            'portfolio' => [
                'id' => $portfolio->id,
                'title' => $portfolio->title,
                'description' => $portfolio->description,
                'industry' => $portfolio->industry,
            ],
            'pages' => $pages,
            'canvasColour' => $canvasColour,
        ]);
    }

    // show form to edit portfolio details
    public function edit(Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        // industries dropdown
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

        return Inertia::render('Portfolios/Edit', [
            'portfolio' => $portfolio,
            'industries' => $industries
        ]);
    }

    // update portfolio details
    public function update(UpdatePortfolioRequest $request, Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validated();
        
        $dataToUpdate = [
            'title' => $validated['title'] ?? $portfolio->title,
            'description' => $validated['description'] ?? $portfolio->description,
            'industry' => $validated['industry'] ?? $portfolio->industry,
        ];

        if ($request->has('canvas_colour')) {
            $dataToUpdate['canvas_colour'] = $validated['canvas_colour'];
        }
        
        $portfolio->update($dataToUpdate);

        return redirect()->route('dashboard')
            ->with('success', 'Portfolio updated successfully!');
    }
    
    // delete portfolio
    public function destroy(Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        $portfolio->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Portfolio deleted successfully.');
    }
}