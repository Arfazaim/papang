<?php

test('contact form is rate limited', function () {
    // Send 5 requests successfully
    for ($i = 0; $i < 5; $i++) {
        $response = $this->post('/contact', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test '.$i,
            'message' => 'Test message '.$i,
        ]);

        $response->assertSessionHas('success');
    }

    // 6th request should be rate limited
    $response = $this->post('/contact', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Test 6',
        'message' => 'Test message 6',
    ]);

    $response->assertStatus(429);
});
