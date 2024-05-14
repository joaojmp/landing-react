<?php

use Src\Posts\Models\Subject;
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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('title')->unique();
            $table->text('short_description')->nullable();
            $table->string('source')->nullable();
            $table->string('image', 400);
            $table->dateTime('date');
            $table->foreignIdFor(Subject::class)->constrained('post_subjects');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
