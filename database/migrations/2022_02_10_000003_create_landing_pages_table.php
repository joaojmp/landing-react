<?php

use Src\Landings\Models\Landing;
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
        Schema::create('landing_pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('name');
            $table->json('html')->nullable();
            $table->json('css')->nullable();
            $table->json('js')->nullable();
            $table->integer('order')->default(9999);
            $table->foreignIdFor(Landing::class)->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landing_pages');
    }
};
