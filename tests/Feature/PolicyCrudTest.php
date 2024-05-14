<?php

use Src\Users\User;
use Src\Policies\Policy;

beforeEach(function () {
    $user = User::factory()->create();

    $this->post(route("cms.store"), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated("cms");

    $this->actingAs($user);
});

afterEach(function () {
    User::truncate();
});

test('can see the policies index page', function () {
    $response = $this->get(route('policies.index'));

    $response->assertStatus(200);
});

test('can create a policy', function () {
    $policyData = [
        'title' => 'New Policy',
        'description' => [
            "id" => '1',
            "type" => 'p',
            "children" => ["text" => 'This is a new policy'],
        ],
    ];

    $response = $this->post(route('policies.store'), $policyData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('policies', ['title' => 'New Policy']);
});

test('can view a policy', function () {
    $policy = Policy::first();

    $response = $this->get(route('policies.show', $policy->id));

    $response->assertStatus(302);
});

test('can see the edit policy page', function () {
    $policy = Policy::first();

    $response = $this->get(route('policies.edit', $policy->id));

    $response->assertStatus(200);
});

test('can update a policy', function () {
    $policy = Policy::first();

    $updatedData = [
        'title' => 'Updated Policy',
        'description' => [
            "id" => '1',
            "type" => 'p',
            "children" => ["text" => 'This is a updated policy'],
        ],
    ];

    $response = $this->put(route('policies.update', $policy), $updatedData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('policies', ['title' => 'Updated Policy']);
});

test('can delete a policy', function () {
    $policy = Policy::first();

    $response = $this->delete(route('policies.destroy', $policy->id));

    $response->assertStatus(302);

    $this->assertDatabaseMissing('policies', ['id' => $policy->id]);
});
