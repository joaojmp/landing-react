<?php

namespace Src\Pages;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "url", "title", "description", "image",
    ];
}
