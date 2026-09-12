<?php

use App\Models\Project;
use App\Models\ProjectCategory;
use App\Models\User;

test('admin can create a project', function () {
    $admin = User::factory()->admin()->create();
    $category = ProjectCategory::create(['name' => 'Web Dev', 'slug' => 'web-dev']);

    $response = $this->actingAs($admin)->post('/admin/projects', [
        'category_id' => $category->id,
        'title' => 'New Awesome Project',
        'slug' => 'new-awesome-project',
        'short_description' => 'A cool description here.',
        'full_description' => 'Full project content.',
        'status' => 'published',
        'is_featured' => false,
        'sort_order' => 0,
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('projects', [
        'title' => 'New Awesome Project',
        'slug' => 'new-awesome-project',
        'status' => 'published',
    ]);
});

test('admin can update a project', function () {
    $admin = User::factory()->admin()->create();
    $category = ProjectCategory::create(['name' => 'Web Dev', 'slug' => 'web-dev']);

    $project = Project::create([
        'category_id' => $category->id,
        'title' => 'Old Title',
        'slug' => 'old-title',
        'short_description' => 'Old description',
        'full_description' => 'Old content',
        'status' => 'draft',
        'sort_order' => 0,
        'is_featured' => false,
    ]);

    $response = $this->actingAs($admin)->put('/admin/projects/'.$project->id, [
        'category_id' => $category->id,
        'title' => 'Updated Title',
        'slug' => 'updated-title',
        'short_description' => 'Updated description',
        'full_description' => 'Updated content',
        'status' => 'published',
        'is_featured' => true,
        'sort_order' => 1,
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('projects', [
        'id' => $project->id,
        'title' => 'Updated Title',
        'slug' => 'updated-title',
        'is_featured' => 1,
    ]);
});

test('admin can delete a project', function () {
    $admin = User::factory()->admin()->create();
    $category = ProjectCategory::create(['name' => 'Web Dev', 'slug' => 'web-dev']);

    $project = Project::create([
        'category_id' => $category->id,
        'title' => 'To be deleted',
        'slug' => 'to-be-deleted',
        'short_description' => 'Desc',
        'full_description' => 'Content',
        'status' => 'draft',
        'sort_order' => 0,
    ]);

    $response = $this->actingAs($admin)->delete('/admin/projects/'.$project->id);

    $response->assertSessionHas('success');
    $this->assertDatabaseMissing('projects', ['id' => $project->id, 'deleted_at' => null]);
});
