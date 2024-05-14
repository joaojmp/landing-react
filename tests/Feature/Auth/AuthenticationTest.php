<?php

use Src\Users\User;
use Database\Seeders\ConfigSeeder;
use Database\Seeders\DatabaseSeeder;
use App\Core\Providers\RouteServiceProvider;

beforeEach(function () {
    app(DatabaseSeeder::class)->call(ConfigSeeder::class);
});

afterEach(function () {
    User::truncate();
});

test('login screen can be rendered', function () {
    $response = $this->get(route("cms.login"));

    $response->assertStatus(200);
});

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post(route("cms.store"), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated("cms");
    $response->assertRedirect(RouteServiceProvider::HOME);
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route("cms.store"), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest("cms");
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route("cms.logout"));

    $this->assertGuest("cms");
    $response->assertRedirect(route("cms.login"));
});
