<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SocialLinkController extends Controller
{
    public function index()
    {
        $links = SocialLink::orderBy('sort_order')->get();

        return Inertia::render('Admin/SocialLinks/Index', [
            'links' => $links,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/SocialLinks/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        SocialLink::create($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social link created.');
    }

    public function edit(SocialLink $socialLink)
    {
        return Inertia::render('Admin/SocialLinks/Form', [
            'link' => $socialLink,
        ]);
    }

    public function update(Request $request, SocialLink $socialLink)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|max:255',
            'icon' => 'nullable|string|max:255',
            'sort_order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        $socialLink->update($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social link updated.');
    }

    public function destroy(SocialLink $socialLink)
    {
        $socialLink->delete();

        return redirect()->route('admin.social-links.index')->with('success', 'Social link deleted.');
    }
}
