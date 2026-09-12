<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Skill;
use App\Models\ContactMessage;
use App\Models\Experience;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalProjects' => Project::count(),
                'totalSkills' => Skill::count(),
                'totalMessages' => ContactMessage::count(),
                'totalExperiences' => Experience::count(),
                'unreadMessages' => ContactMessage::where('is_read', false)->count(),
            ],
        ]);
    }
}
