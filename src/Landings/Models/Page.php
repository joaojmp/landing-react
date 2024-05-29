<?php

namespace Src\Landings\Models;

use Src\Landings\Models\Landing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = "landing_pages";

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "content", "html", "css", "js", "landing_id",
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = [
        "body",
    ];


    // Relationships

    /**
     * Get the landing that owns the Page
     *
     * @return BelongsTo
     */
    public function landing(): BelongsTo
    {
        return $this->belongsTo(Landing::class);
    }


    // Getters and Setters

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
