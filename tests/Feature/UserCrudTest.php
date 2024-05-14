<?php

use Src\Users\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

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

test('can see the user index page', function () {
    $response = $this->get(route('users.index'));

    $response->assertStatus(200);
});

test('can create a user', function () {
    $userData = [
        'photo' => UploadedFile::fake()->image('desktop_image.jpg'),
        'name' => 'New User',
        'email' => 'newuser@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    $response = $this->post(route('users.store'), $userData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('users', ['email' => DB::table("users")->first()->email]);
});

test('can view a user', function () {
    $user = User::first();

    $response = $this->get(route('users.show', $user->id));

    $response->assertStatus(302);
});

test('can see the edit user page', function () {
    $user = User::first();

    $response = $this->get(route('users.edit', $user->id));

    $response->assertStatus(200);
});

test('can update a user', function () {
    $user = User::first();

    $updatedData = [
        'photo' => UploadedFile::fake()->image('desktop_image.jpg'),
        'name' => 'Updated User',
        'email' => 'updateduser@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    $response = $this->put(route('users.update', $user), $updatedData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('users', ['email' => DB::table("users")->first()->email]);
});

test('can delete a user', function () {
    $user = User::first();

    $response = $this->delete(route('users.destroy', $user->id));

    $response->assertStatus(302);

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});
