<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EducationController extends Controller
{
    public function index()
    {
        $educations = Education::orderBy('start_date', 'desc')->get();

        return Inertia::render('Admin/Educations/Index', [
            'educations' => $educations,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Educations/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'program' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'sort_order' => 'integer',
        ]);

        Education::create($validated);

        return redirect()->route('admin.educations.index')->with('success', 'Education created successfully.');
    }

    public function edit(Education $education)
    {
        return Inertia::render('Admin/Educations/Form', [
            'education' => $education,
        ]);
    }

    public function update(Request $request, Education $education)
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'program' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'sort_order' => 'integer',
        ]);

        $education->update($validated);

        return redirect()->route('admin.educations.index')->with('success', 'Education updated successfully.');
    }

    public function destroy(Education $education)
    {
        $education->delete();

        return redirect()->route('admin.educations.index')->with('success', 'Education deleted successfully.');
    }
}
