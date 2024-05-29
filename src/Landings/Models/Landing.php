<?php

namespace Src\Landings\Models;

use Src\Landings\Models\Lead;
use Src\Landings\Models\Page;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Landing extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "slug", "title", "description", "image", "favicon", "emails", "script_head", "script_body",
    ];


    // Relationships

    /**
     * Get all of the pages for the Landing
     *
     * @return HasMany
     */
    public function pages(): HasMany
    {
        return $this->hasMany(Page::class);
    }

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


    public function setEmailsAttribute(?array $value): void
    {
        $this->attributes["emails"] = $value && count($value) ? implode(",", $value) : null;
    }
}
