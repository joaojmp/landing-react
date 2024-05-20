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
        "slug", "title", "description", "image", "favicon", "emails", "script_head", "script_body", "content", "html", "css",
    ];


    // Getters and Setters

    public function getEmailsAttribute(?string $value): ?array
    {
        return is_null($value) ? $value : explode(",", $value);
    }

    public function getHtmlAttribute(?string $value): ?string
    {
        return is_null($value) ? $value : json_decode($value, true);
    }

    public function getCssAttribute(?string $value): ?string
    {
        return is_null($value) ? $value : json_decode($value, true);
    }


    public function setTitleAttribute(string $value): void
    {
        $this->attributes["title"] = $value;
        $this->attributes["slug"] = Str::slug($value);
    }

    public function setEmailsAttribute(?array $value): void
    {
        $this->attributes["emails"] = is_null($value) ? $value : implode(",", $value);
    }

    public function setHtmlAttribute(?string $value): void
    {
        $this->attributes["html"] = is_null($value) ? $value : json_encode($value);
    }

    public function setCssAttribute(?string $value): void
    {
        $this->attributes["css"] = is_null($value) ? $value : json_encode($value);
    }
}
