<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use App\Models\SkillCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::with('category')
            ->orderBy('sort_order')
            ->get()
            ->map(function ($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                    'category_name' => $skill->category ? $skill->category->name : '',
                    'level' => $skill->level,
                    'is_featured' => $skill->is_featured,
                    'sort_order' => $skill->sort_order,
                ];
            });

        return Inertia::render('Admin/Skills/Index', [
            'skills' => $skills,
        ]);
    }

    public function create()
    {
        $categories = SkillCategory::orderBy('name')->get();

        return Inertia::render('Admin/Skills/Form', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced,Expert',
            'description' => 'nullable|string',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $category = SkillCategory::firstOrCreate(
            ['name' => $validated['category_name']]
        );

        Skill::create([
            'category_id' => $category->id,
            'name' => $validated['name'],
            'icon' => $validated['icon'],
            'level' => $validated['level'],
            'description' => $validated['description'],
            'is_featured' => $validated['is_featured'] ?? false,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.skills.index')->with('success', 'Skill created successfully.');
    }

    public function edit(Skill $skill)
    {
        $categories = SkillCategory::orderBy('name')->get();

        return Inertia::render('Admin/Skills/Form', [
            'skill' => [
                'id' => $skill->id,
                'name' => $skill->name,
                'category_name' => $skill->category ? $skill->category->name : '',
                'icon' => $skill->icon,
                'level' => $skill->level,
                'description' => $skill->description,
                'is_featured' => $skill->is_featured,
                'sort_order' => $skill->sort_order,
            ],
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'level' => 'required|string|in:Beginner,Intermediate,Advanced,Expert',
            'description' => 'nullable|string',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ]);

        $category = SkillCategory::firstOrCreate(
            ['name' => $validated['category_name']]
        );

        $skill->update([
            'category_id' => $category->id,
            'name' => $validated['name'],
            'icon' => $validated['icon'],
            'level' => $validated['level'],
            'description' => $validated['description'],
            'is_featured' => $validated['is_featured'] ?? false,
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.skills.index')->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->route('admin.skills.index')->with('success', 'Skill deleted successfully.');
    }
}
