<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
                'totalProjects' => 0,
                'totalSkills' => 0,
                'totalMessages' => 0,
                'totalExperiences' => 0,
            ],
        ]);
    }
}
