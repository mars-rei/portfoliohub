<?php

namespace App\Http\Controllers;

use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Models\Media;
use App\Http\Requests\StoreMediaRequest;
use App\Http\Requests\UpdateMediaRequest;

class MediaController extends Controller
{
    protected $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => config('services.cloudinary.cloud_name'),
                'api_key'    => config('services.cloudinary.api_key'),
                'api_secret' => config('services.cloudinary.api_secret'),
            ],
            'url' => [
                'secure' => true
            ]
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $media = Auth::user()->media()
            ->orderBy('created_at', 'desc')
            ->get(['id', 'file_name', 'file_type', 'caption', 'cloud_url', 'cloud_public_id', 'created_at']);

        return Inertia::render('Media/Index', [
            'media' => $media
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Media/Create');
    }

    public function store(StoreMediaRequest $request)
{
    $validated = $request->validated();

    // get user id to assign media to their own folder in cloudinary
    $user = Auth::user();

    $file = $request->file('file');

    $file_name = $file->getClientOriginalName();
    $file_type = $file->getClientOriginalExtension();

    $folder = 'portfolioHub/' . $user->id; 
    
    $uploadResult = $this->cloudinary->uploadApi()->upload(
        $file->getRealPath(),
        [
            'resource_type' => 'raw',
            "filename" => $file_name,
            'folder' => $folder, 
        ]
    );

    $media = Media::create([
        'user_id' => Auth::id(),
        'file_name' => $file_name,
        'file_type' => $file_type,
        'caption' => $validated['caption'] ?? null,
        'cloud_url' => $uploadResult['secure_url'],
        'cloud_public_id' => $uploadResult['public_id'],
    ]);

    return redirect()->route('dashboard')
        ->with('success', 'Media uploaded successfully!');

}

    /**
     * Display the specified resource.
     */
    public function show(Media $media)
    {
        if ($media->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Media/Show', [
            'media' => $media
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Media $media)
    {
        if ($media->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Media/Edit', [
            'media' => $media
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMediaRequest $request, Media $media)
    {
        if ($media->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validated();
        
        $media->update([
            'caption' => $validated['caption'] ?? $media->caption,
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Media updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $media)
    {
        if ($media->user_id !== Auth::id()) {
            abort(403);
        }
        
        $isImage = in_array($media->file_type, ['jpg', 'jpeg', 'png', 'gif', 'webp']);
        
        $this->cloudinary->uploadApi()->destroy(
            $media->cloud_public_id,
            [
                "resource_type" => $isImage ? "image" : "raw"
            ]
        );
        
        $media->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Media deleted successfully!');
    }
}