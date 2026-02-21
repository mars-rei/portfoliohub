<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Http\Requests\StorePortfolioRequest;
use App\Http\Requests\UpdatePortfolioRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    // display user's portfolios
    public function index()
    {
        $portfolios = Auth::user()->portfolios()
            ->orderBy('updated_at', 'desc')
            ->get(['id', 'title', 'industry', 'publish_status', 'updated_at']);

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
        
        // make sure code is empty
        $validated['code'] = null;

        $portfolio = Portfolio::create($validated);

        return redirect()->route('dashboard')
            ->with('success', 'Portfolio created successfully!');
    }

    // display portoflio preview
    public function show(Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Portfolios/Show', [
            'portfolio' => $portfolio
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
        
        $portfolio->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'industry' => $validated['industry'],
            'publish_status' => $validated['publish_status'] ?? false,
        ]);

        return redirect()->route('portfolios.show', $portfolio->id)
            ->with('success', 'Portfolio details updated successfully.');
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



    // for builder of portfolio
    public function build(Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Portfolios/Builder', [
            'portfolio' => $portfolio
        ]);
    }

    // to save portfolio code from builder
    public function saveCode(Request $request, Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'code' => 'required|json'
        ]);

        $portfolio->update([
            'code' => $request->code,
            'updated_at' => now()
        ]);

        return response()->json(['message' => 'Portfolio saved successfully']);
    }

    // update publish status of portfolio
    public function togglePublish(Portfolio $portfolio)
    {
        if ($portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        $portfolio->update([
            'publish_status' => !$portfolio->publish_status
        ]);

        $status = $portfolio->publish_status ? 'published' : 'unpublished';
        
        return redirect()->back()->with('success', "Portfolio {$status} successfully.");
    }
}