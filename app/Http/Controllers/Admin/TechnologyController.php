<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TechnologyController extends Controller
{
    public function index()
    {
        $technologies = Technology::withCount('projects')->orderBy('name')->get();

        return Inertia::render('Admin/Technologies/Index', [
            'technologies' => $technologies,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Technologies/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:technologies,slug',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
        ]);

        Technology::create($validated);

        return redirect()->route('admin.technologies.index')->with('success', 'Technology created successfully.');
    }

    public function edit(Technology $technology)
    {
        return Inertia::render('Admin/Technologies/Form', [
            'technology' => $technology,
        ]);
    }

    public function update(Request $request, Technology $technology)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:technologies,slug,'.$technology->id,
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
        ]);

        $technology->update($validated);

        return redirect()->route('admin.technologies.index')->with('success', 'Technology updated successfully.');
    }

    public function destroy(Technology $technology)
    {
        $technology->delete();

        return redirect()->route('admin.technologies.index')->with('success', 'Technology deleted successfully.');
    }
}
