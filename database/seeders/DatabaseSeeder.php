<?php

namespace Database\Seeders;

use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\SiteSetting;
use App\Models\Skill;
use App\Models\SkillCategory;
use App\Models\SocialLink;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Check if admin user exists, if not create one
        if (! User::where('email', 'admin@arfa.dev')->exists()) {
            User::factory()->create([
                'name' => 'Arfa Admin',
                'email' => 'admin@arfa.dev',
                'password' => bcrypt('password'),
                'is_admin' => true,
            ]);
        }

        // Project Categories & Technologies
        $techs = Technology::factory(10)->create();

        ProjectCategory::factory(4)->create()->each(function ($category) use ($techs) {
            Project::factory(3)->create([
                'category_id' => $category->id,
            ])->each(function ($project) use ($techs) {
                // Attach random 2-4 technologies
                $project->technologies()->attach(
                    $techs->random(rand(2, 4))->pluck('id')->toArray()
                );
            });
        });

        // Skills
        SkillCategory::factory(3)->create()->each(function ($category) {
            Skill::factory(5)->create([
                'category_id' => $category->id,
            ]);
        });

        // Experiences
        Experience::factory(3)->create()->each(function ($experience) use ($techs) {
            $experience->technologies()->attach(
                $techs->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

        // Education
        Education::factory(2)->create();

        // Certificates
        Certificate::factory(4)->create();

        // Settings
        SiteSetting::insert([
            ['key' => 'site_name', 'value' => 'Arfa Portfolio', 'group' => 'general', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'hero_title', 'value' => 'Hi, I\'m Arfa', 'group' => 'general', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'hero_subtitle', 'value' => 'A Fullstack Developer passionate about building excellent software.', 'group' => 'general', 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Social Links
        SocialLink::insert([
            ['name' => 'GitHub', 'url' => 'https://github.com/arfa', 'icon' => 'github', 'is_active' => true, 'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'LinkedIn', 'url' => 'https://linkedin.com/in/arfa', 'icon' => 'linkedin', 'is_active' => true, 'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
