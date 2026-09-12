<?php

use App\Models\User;

test('admin can access dashboard', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->get('/admin');

    $response->assertStatus(200);
});

test('non-admin cannot access dashboard', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/admin');

    $response->assertStatus(403);
});

test('guests cannot access dashboard', function () {
    $response = $this->get('/admin');

    $response->assertRedirect('/login');
});
