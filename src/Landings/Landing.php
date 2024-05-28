<?php

namespace Src\Landings;

use Src\leads\Lead;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Landing extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "slug", "title", "description", "image", "favicon", "emails", "script_head", "script_body", "content", "html", "css", "js",
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = [
        "body",
    ];


    // Relationships

    /**
     * Get all of the leads for the Landing
     *
     * @return HasMany
     */
    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }


    // Getters and Setters

    public function getEmailsAttribute(?string $value): ?array
    {
        return is_null($value) ? $value : explode(",", $value);
    }

    public function getHtmlAttribute(?string $value): ?string
    {
        if (is_null($value)) {
            return $value;
        }

        return json_decode(preg_replace('/<script.*?<\/script>/', '', $value), true);
    }

    public function getCssAttribute(?string $value): ?string
    {
        return is_null($value) ? $value : json_decode($value, true);
    }

    public function getJsAttribute(?string $value): ?string
    {
        return is_null($value) ? $value : json_decode($value, true);
    }

    public function getBodyAttribute(): ?string
    {
        preg_match('/<body.*?>/', $this->html, $matches);

        return count($matches) ? $matches[0] : null;
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

    public function setJsAttribute(?string $value): void
    {
        $this->attributes["js"] = is_null($value) ? $value : json_encode($value);
    }
}
