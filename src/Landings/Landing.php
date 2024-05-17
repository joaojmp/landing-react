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
        "slug", "title", "content", "html", "css",
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

    public function setHtmlAttribute(string $value): void
    {
        $this->attributes["html"] = $value ? urlencode($value) : null;
    }

    public function setCssAttribute(string $value): void
    {
        $this->attributes["css"] = $value ? json_encode($value) : null;
    }

    public function getHtmlAttribute(): string
    {
        return json_decode($this->attributes["html"], true);
    }

    public function getCssAttribute(): string
    {
        return json_decode($this->attributes["css"], true);
    }
}
