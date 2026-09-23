<?php

use App\Models\Project;
use App\Models\ProjectCategory;
use Inertia\Testing\AssertableInertia;

test('public projects index page can be rendered', function () {
    $response = $this->get('/projects');

    $response->assertStatus(200);
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Projects/Index')
        ->has('projects')
        ->has('categories')
    );
});

test('public projects index only shows published projects', function () {
    $category = ProjectCategory::create(['name' => 'Web', 'slug' => 'web']);

    Project::create([
        'category_id' => $category->id,
        'title' => 'Published Project',
        'slug' => 'published-project',
        'short_description' => 'A published project',
        'status' => 'published',
        'sort_order' => 0,
    ]);

    Project::create([
        'category_id' => $category->id,
        'title' => 'Draft Project',
        'slug' => 'draft-project',
        'short_description' => 'A draft project',
        'status' => 'draft',
        'sort_order' => 0,
    ]);

    $response = $this->get('/projects');

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Projects/Index')
        ->has('projects.data', 1)
    );
});

test('public project detail page can be rendered', function () {
    $category = ProjectCategory::create(['name' => 'Web', 'slug' => 'web']);

    Project::create([
        'category_id' => $category->id,
        'title' => 'My Project',
        'slug' => 'my-project',
        'short_description' => 'A cool project',
        'status' => 'published',
        'sort_order' => 0,
    ]);

    $response = $this->get('/projects/my-project');

    $response->assertStatus(200);
    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Projects/Show')
        ->has('project')
        ->has('relatedProjects')
        ->where('project.slug', 'my-project')
    );
});

test('public project detail returns 404 for non-existent slug', function () {
    $response = $this->get('/projects/non-existent-slug');

    $response->assertStatus(404);
});

test('public project detail returns 404 for draft projects', function () {
    $category = ProjectCategory::create(['name' => 'Web', 'slug' => 'web']);

    Project::create([
        'category_id' => $category->id,
        'title' => 'Draft Project',
        'slug' => 'draft-project',
        'short_description' => 'Draft project',
        'status' => 'draft',
        'sort_order' => 0,
    ]);

    $response = $this->get('/projects/draft-project');

    $response->assertStatus(404);
});
