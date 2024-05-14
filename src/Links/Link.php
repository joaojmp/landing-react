<?php

namespace Src\Links;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "active", "type", "title", "value", "icon", "image", "order"
    ];
}
