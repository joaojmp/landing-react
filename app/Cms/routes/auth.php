<?php

use Illuminate\Support\Facades\Route;
use App\Cms\Http\Controllers\Auth\NewPasswordController;
use App\Cms\Http\Controllers\Auth\PasswordResetLinkController;
use App\Cms\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware('guest:cms')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('cms.login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('cms.store');

    Route::get('/forgot-password', [PasswordResetLinkController::class, 'create'])->name('cms.password.request');
    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->name('cms.password.email');

    Route::get('/reset-password/{token}', [NewPasswordController::class, 'create'])->name('cms.password.reset');
    Route::post('/reset-password', [NewPasswordController::class, 'store'])->name('cms.password.store');
});

Route::middleware('auth:cms')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('cms.logout');
});
