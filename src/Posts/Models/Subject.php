<?php

namespace Src\Posts\Models;

use Src\Posts\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subject extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = "post_subjects";

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "slug", "title", "order",
    ];


    // Relationships

    /**
     * Get all of the posts for the Subject
     *
     * @return HasMany
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }


    // Getters and Setters

    /**
     * Set the title attribute and automatically generate a slug.
     *
     * @param string $value The value of the "title" attribute.
     * 
     * @return void
     */
    public function setTitleAttribute($value): void
    {
        $this->attributes["title"] = $value;
        $this->attributes["slug"] = Str::slug($value);
    }
}
