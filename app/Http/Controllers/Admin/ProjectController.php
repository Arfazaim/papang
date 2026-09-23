<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\ActivityLog;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\Technology;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with(['category'])->withCount('technologies')->orderBy('sort_order')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Form', [
            'categories' => ProjectCategory::orderBy('name')->get(),
            'technologies' => Technology::orderBy('name')->get(),
        ]);
    }

    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        if ($request->hasFile('cover_image')) {
            $validated['cover_image'] = $request->file('cover_image')->store('projects', 'public');
        }

        $project = Project::create($validated);

        if (isset($validated['technologies'])) {
            $project->technologies()->sync($validated['technologies']);
        }

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'created',
            'resource_type' => 'Project',
            'resource_id' => $project->id,
            'description' => "Created project: {$project->title}",
        ]);

        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
        $project->load(['category', 'technologies', 'media']);

        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
            'categories' => ProjectCategory::orderBy('name')->get(),
            'technologies' => Technology::orderBy('name')->get(),
            'readOnly' => true,
        ]);
    }

    public function edit(Project $project)
    {
        $project->load('technologies');

        return Inertia::render('Admin/Projects/Form', [
            'project' => $project,
            'categories' => ProjectCategory::orderBy('name')->get(),
            'technologies' => Technology::orderBy('name')->get(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        $validated = $request->validated();

        if ($request->hasFile('cover_image')) {
            if ($project->cover_image && Storage::disk('public')->exists($project->cover_image)) {
                Storage::disk('public')->delete($project->cover_image);
            }
            $validated['cover_image'] = $request->file('cover_image')->store('projects', 'public');
        }

        $project->update($validated);

        if (isset($validated['technologies'])) {
            $project->technologies()->sync($validated['technologies']);
        } else {
            $project->technologies()->detach();
        }

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'updated',
            'resource_type' => 'Project',
            'resource_id' => $project->id,
            'description' => "Updated project: {$project->title}",
        ]);

        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->cover_image && Storage::disk('public')->exists($project->cover_image)) {
            Storage::disk('public')->delete($project->cover_image);
        }

        $project->delete();

        ActivityLog::create([
            'user_id' => request()->user()->id,
            'action' => 'deleted',
            'resource_type' => 'Project',
            'resource_id' => $project->id,
            'description' => "Deleted project: {$project->title}",
        ]);

        return redirect()->route('admin.projects.index')->with('success', 'Project deleted successfully.');
    }
}
