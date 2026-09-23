<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectCategory;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of published projects.
     */
    public function index()
    {
        $projects = Project::with(['category', 'technologies'])
            ->where('status', 'published')
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        $categories = ProjectCategory::withCount(['projects' => function ($query) {
            $query->where('status', 'published');
        }])->orderBy('name')->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified project.
     */
    public function show(string $slug)
    {
        $project = Project::with(['category', 'technologies', 'media'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        $relatedProjects = Project::with(['category', 'technologies'])
            ->where('status', 'published')
            ->where('id', '!=', $project->id)
            ->when($project->category_id, function ($query) use ($project) {
                $query->where('category_id', $project->category_id);
            })
            ->take(3)
            ->get();

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
        ]);
    }
}
