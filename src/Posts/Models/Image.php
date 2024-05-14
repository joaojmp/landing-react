<?php

namespace Src\Posts\Models;

use Src\Posts\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Image extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = "post_images";

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "name", "legend", "order", "post_id"
    ];


    // Relationships

    /**
     * Get the post that owns the Image
     *
     * @return BelongsTo
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
