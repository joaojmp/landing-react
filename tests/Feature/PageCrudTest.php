<?php

use Src\Pages\Page;
use Src\Users\User;
use Illuminate\Http\UploadedFile;

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

test('can see the pages index page', function () {
    $response = $this->get(route('pages.index'));

    $response->assertStatus(200);
});

test('can create a page', function () {
    $pageData = [
        'url' => 'http://localhost:8000/',
        'title' => 'New Page',
        'description' => [
            "id" => '1',
            "type" => 'p',
            "children" => ["text" => 'This is a new page'],
        ],
        'image' => UploadedFile::fake()->image('image.jpg'),
    ];

    $response = $this->post(route('pages.store'), $pageData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('pages', ['title' => 'New Page']);
});

test('can view a page', function () {
    $page = Page::first();

    $response = $this->get(route('pages.show', $page->id));

    $response->assertStatus(302);
});

test('can see the edit page page', function () {
    $page = Page::first();

    $response = $this->get(route('pages.edit', $page->id));

    $response->assertStatus(200);
});

test('can update a page', function () {
    $page = Page::first();

    $updatedData = [
        'url' => 'http://localhost:8000/',
        'title' => 'Updated Page',
        'description' => [
            "id" => '1',
            "type" => 'p',
            "children" => ["text" => 'This is a updated page'],
        ],
        'old_image' => $page->image,
        'image' => UploadedFile::fake()->image('image.jpg'),
    ];

    $response = $this->put(route('pages.update', $page), $updatedData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('pages', ['title' => 'Updated Page']);
});

test('can delete a page', function () {
    $page = Page::first();

    $response = $this->delete(route('pages.destroy', $page->id));

    $response->assertStatus(302);

    $this->assertDatabaseMissing('pages', ['id' => $page->id]);
});
