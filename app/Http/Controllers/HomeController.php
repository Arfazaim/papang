<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\SiteSetting;
use App\Models\Skill;
use App\Models\SocialLink;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::all()->pluck('value', 'key')->toArray();
        $socialLinks = SocialLink::where('is_active', true)->orderBy('sort_order')->get();

        $skillsRaw = Skill::with('category')->orderBy('sort_order')->get();
        $skills = $skillsRaw->groupBy(function ($skill) {
            return $skill->category ? $skill->category->name : 'Other';
        });

        $experiences = Experience::orderBy('start_date', 'desc')->get();
        $educations = Education::orderBy('start_date', 'desc')->get();
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();

        $featuredProjects = Project::with(['category', 'technologies'])
            ->where('status', 'published')
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        return Inertia::render('Welcome', [
            'settings' => $settings,
            'socialLinks' => $socialLinks,
            'skills' => $skills,
            'experiences' => $experiences,
            'educations' => $educations,
            'certificates' => $certificates,
            'featuredProjects' => $featuredProjects,
        ]);
    }
}
