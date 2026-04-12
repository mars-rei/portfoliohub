<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Models\Portfolio;

class PageController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Pages/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request)
    {
        $validated = $request->validated();

        $portfolio = Portfolio::where('id', $validated['portfolio_id'])
            ->where('user_id', Auth::id())
            ->first();

        if (!$portfolio) {
            return response()->json(403);
        }

        // make sure code.itemSyles is object type because it keeps becoming [] instead of {}
        if (isset($validated['code']['itemStyles']) && empty($validated['code']['itemStyles'])) {
            $validated['code']['itemStyles'] = new \stdClass();
        }
        
        if (!isset($validated['code']['itemStyles'])) {
            $validated['code']['itemStyles'] = new \stdClass();
        }
        

        $page = Page::create([
            'portfolio_id' => $validated['portfolio_id'],
            'page_name' => $validated['page_name'],
            'code' => $validated['code'],
        ]);

        return response()->json([
            'page' => $page
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        if ($page->portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        return;

        {/*
        return Inertia::render('Pages/Show');
        */}
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, Page $page)
    {
        if ($page->portfolio->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validated();
            
        // update page name
        if (isset($validated['page_name'])) {
            $page->page_name = $validated['page_name'];
        }

        // for updating attributes such as colour
        if (isset($validated['code'])) {
            $currentCode = $page->code ?? [];
            $mergedCode = array_merge($currentCode, $validated['code']);
            $page->code = $mergedCode;
        }

        $page->save();

        return response()->json([
            'message' => 'Page updated successfully',
            'page' => $page->fresh()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        if ($page->portfolio->user_id !== Auth::id()) {
            abort(403);
        }
        
        $page->delete();
        
        return response()->json(['message' => 'Page deleted successfully']);
    }
}
