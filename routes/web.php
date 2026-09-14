<?php

use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\MediaController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProjectCategoryController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\SocialLinkController;
use App\Http\Controllers\Admin\TechnologyController;
use App\Http\Controllers\HomeController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    ContactMessage::create($validated);

    return back()->with('success', 'Message sent successfully.');
})->name('contact.store');

Route::middleware(['auth', EnsureUserIsAdmin::class])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/', DashboardController::class)->name('dashboard');

        // Portfolio Core
        Route::resource('project-categories', ProjectCategoryController::class)->except(['show']);
        Route::resource('technologies', TechnologyController::class)->except(['show']);
        Route::resource('projects', ProjectController::class);

        // Resume & Career
        Route::resource('skills', SkillController::class)->except(['show']);
        Route::resource('experiences', ExperienceController::class)->except(['show']);
        Route::resource('educations', EducationController::class)->except(['show']);
        Route::resource('certificates', CertificateController::class)->except(['show']);

        // Inbox
        Route::resource('messages', MessageController::class)->only(['index', 'show', 'destroy']);

        // Media Library
        Route::resource('media', MediaController::class)->only(['index', 'store', 'destroy']);

        // Settings
        Route::get('settings', [SiteSettingController::class, 'index'])->name('settings.index');
        Route::post('settings', [SiteSettingController::class, 'store'])->name('settings.store');

        // Social Links
        Route::resource('social-links', SocialLinkController::class)->except('show');
    });
