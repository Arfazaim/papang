<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectCategoryController extends Controller
{
    public function index()
    {
        $categories = ProjectCategory::withCount('projects')->orderBy('sort_order')->get();

        return Inertia::render('Admin/ProjectCategories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ProjectCategories/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:project_categories,slug',
            'description' => 'nullable|string',
            'sort_order' => 'integer',
        ]);

        ProjectCategory::create($validated);

        return redirect()->route('admin.project-categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(ProjectCategory $projectCategory)
    {
        return Inertia::render('Admin/ProjectCategories/Form', [
            'category' => $projectCategory,
        ]);
    }

    public function update(Request $request, ProjectCategory $projectCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:project_categories,slug,'.$projectCategory->id,
            'description' => 'nullable|string',
            'sort_order' => 'integer',
        ]);

        $projectCategory->update($validated);

        return redirect()->route('admin.project-categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(ProjectCategory $projectCategory)
    {
        $projectCategory->delete();

        return redirect()->route('admin.project-categories.index')->with('success', 'Category deleted successfully.');
    }
}
