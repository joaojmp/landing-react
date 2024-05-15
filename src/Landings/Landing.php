<?php

namespace Src\Landings;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Landing extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "slug", "title", "code",
    ];


    // Getters and Setters

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
}
