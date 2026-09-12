<?php

test('visitor can submit contact message', function () {
    $response = $this->post('/contact', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Hello from Pest',
        'message' => 'This is a test message.',
    ]);

    $response->assertSessionHas('success');

    $this->assertDatabaseHas('contact_messages', [
        'email' => 'john@example.com',
        'subject' => 'Hello from Pest',
    ]);
});

test('contact form requires all fields', function () {
    $response = $this->post('/contact', []);

    $response->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
});

test('contact form requires valid email', function () {
    $response = $this->post('/contact', [
        'name' => 'John Doe',
        'email' => 'invalid-email',
        'subject' => 'Hello',
        'message' => 'Message',
    ]);

    $response->assertSessionHasErrors('email');
});
