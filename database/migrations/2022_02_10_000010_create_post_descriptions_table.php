<?php

use Src\Posts\Models\Post;
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
        Schema::create('post_descriptions', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('image', 400)->nullable();
            $table->string('url', 255)->nullable();
            $table->text('text')->nullable();
            $table->integer('order')->default(9999);
            $table->foreignIdFor(Post::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post_descriptions');
    }
};
