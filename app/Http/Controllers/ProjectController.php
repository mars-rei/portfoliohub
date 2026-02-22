<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // display user's projects
    public function index()
    {
        $projects = Auth::user()->projects()
            ->orderBy('updated_at', 'desc')
            ->get(['id', 'title', 'started_on', 'ended_on']);

        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    // show project creation form
    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    // store newly created project
    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();
    
        $validated['user_id'] = Auth::id();
        
        $project = Project::create($validated);
        
        return redirect()->route('dashboard')
            ->with('success', 'Project created successfully!');
    }

    // display project preview
    public function show(Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }

    // show form to edit project details
    public function edit(Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Projects/Edit', [
            'project' => $project
        ]);
    }

    // update project details
    public function update(UpdateProjectRequest $request, Project $project)
    {
       if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validated();

        $project->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'started_on' => $validated['started_on'],
            'ended_on' => $validated['ended_on'] ?? null,
        ]);

        return redirect()->route('projects.show', $project->id)
            ->with('success', 'Project details updated successfully.');
    }

    // delete project
    public function destroy(Project $project)
    {
        if ($project->user_id !== Auth::id()) {
            abort(403);
        }

        $project->delete();

        return redirect()->route('dashboard')
            ->with('success', 'Project deleted successfully.');
    }
}
