<?php

namespace Src\Posts\Models;

use Src\Posts\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Description extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = "post_descriptions";

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "title", "image", "url", "text", "order", "post_id",
    ];


    // Relationships

    /**
     * Get the post that owns the Description
     *
     * @return BelongsTo
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }


    // Getters and Setters

    /**
     * Get the text attribute as an array.
     *
     * @param string|null $value The value of the "text" attribute.
     * 
     * @return array
     */
    public function getTextAttribute(string|null $value): array
    {
        return $value ? json_decode($value, true) : [];
    }

    /**
     * Set the text attribute with additional processing for handling null values.
     *
     * @param array $value The value of the "text" attribute.
     * 
     * @return void
     */
    public function setTextAttribute(array $value): void
    {
        array_walk_recursive($value, function (&$item) {
            $item = null === $item ? '' : $item;
        });

        $this->attributes["text"] = json_encode($value);
    }
}
