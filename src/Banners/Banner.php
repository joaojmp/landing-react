<?php

namespace Src\Banners;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "title", "link", "desktop", "tablet", "mobile", "order",
    ];
}
