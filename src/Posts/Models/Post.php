<?php

namespace Src\Posts\Models;

use Illuminate\Support\Str;
use Src\Posts\Models\Image;
use Src\Posts\Models\Subject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "slug", "title", "short_description", "source", "image", "date", "subject_id",
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        "date" => "datetime",
    ];


    // Relationships

    /**
     * Get the subject that owns the Post
     *
     * @return BelongsTo
     */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /**
     * Get all of the descriptions for the Post
     *
     * @return HasMany
     */
    public function descriptions(): HasMany
    {
        return $this->hasMany(Description::class);
    }

    /**
     * Get all of the images for the Post
     *
     * @return HasMany
     */
    public function images(): HasMany
    {
        return $this->hasMany(Image::class);
    }


    // Getters and Setters

    /**
     * Get the formatted date attribute.
     *
     * @param string $value The value of the "date" attribute.
     * 
     * @return string
     */
    public function getDateAttribute(string $value): string
    {
        return date($value);
    }

    /**
     * Set the title attribute and automatically generate a slug.
     *
     * @param string $value The value of the "title" attribute.
     * 
     * @return void
     */
    public function setTitleAttribute(string $value): void
    {
        $this->attributes["title"] = $value;
        $this->attributes["slug"] = Str::slug($value);
    }

    /**
     * Set the date attribute and format it as needed.
     *
     * @param string $value The value of the "date" attribute.
     * 
     * @return void
     */
    public function setDateAttribute(string $value): void
    {
        $this->attributes["date"] = implode("-", array_reverse(explode("/", $value)));
    }
}
