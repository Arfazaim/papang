<?php

use Inertia\Testing\AssertableInertia;

test('public portfolio homepage can be rendered', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});

test('public portfolio passes required inertia props', function () {
    $response = $this->get('/');
    $response->assertStatus(200);

    $response->assertInertia(fn (AssertableInertia $page) => $page
        ->component('Welcome')
        ->has('settings')
        ->has('socialLinks')
        ->has('skills')
        ->has('experiences')
        ->has('educations')
        ->has('certificates')
        ->has('featuredProjects')
    );
});
