<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('landings', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('title')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('favicon')->nullable();
            $table->text('emails')->nullable();
            $table->text('script_head')->nullable();
            $table->text('script_body')->nullable();
            $table->json('content')->nullable();
            $table->json('html')->nullable();
            $table->json('css')->nullable();
            $table->json('js')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landings');
    }
};
