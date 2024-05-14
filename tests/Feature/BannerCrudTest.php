<?php

use Src\Users\User;
use Src\Banners\Banner;
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

test('can see the banner index page', function () {
    $response = $this->get(route('banners.index'));

    $response->assertStatus(200);
});

test('can create a banner', function () {
    $bannerData = [
        'title' => 'New Banner',
        'desktop' => UploadedFile::fake()->image('desktop_image.jpg'),
    ];

    $response = $this->post(route('banners.store'), $bannerData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('banners', ['title' => 'New Banner']);
});

test('can view a banner', function () {
    $banner = Banner::first();

    $response = $this->get(route('banners.show', $banner->id));

    $response->assertStatus(302);
});

test('can see the edit banner page', function () {
    $banner = Banner::first();

    $response = $this->get(route('banners.edit', $banner->id));

    $response->assertStatus(200);
});

test('can update a banner', function () {
    $banner = Banner::first();

    $updatedData = [
        'title' => 'Updated Banner',
        'old_desktop' => $banner->desktop,
        'desktop' => UploadedFile::fake()->image('desktop_image.jpg'),
        'old_tablet' => $banner->tablet,
        'tablet' => UploadedFile::fake()->image('tablet_image.jpg'),
        'old_mobile' => $banner->mobile,
        'mobile' => UploadedFile::fake()->image('mobile_image.jpg'),
    ];

    $response = $this->put(route('banners.update', $banner), $updatedData);

    $response->assertStatus(302);

    $this->assertDatabaseHas('banners', ['title' => 'Updated Banner']);
});

test('can delete a banner', function () {
    $banner = Banner::first();

    $response = $this->delete(route('banners.destroy', $banner->id));

    $response->assertStatus(302);

    $this->assertDatabaseMissing('banners', ['id' => $banner->id]);
});
