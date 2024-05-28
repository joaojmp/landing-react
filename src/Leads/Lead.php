<?php

namespace Src\Leads;

use Src\Landings\Landing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "data", "landing_id",
    ];


    // Relationships

    /**
     * Get the landing that owns the Lead
     *
     * @return BelongsTo
     */
    public function landing(): BelongsTo
    {
        return $this->belongsTo(Landing::class);
    }


    // Getters and Setters

    public function getDataAttribute(?string $value): ?array
    {
        return is_null($value) ? $value : json_decode($value, true);
    }


    public function setDataAttribute(?array $value): void
    {
        $this->attributes["data"] = is_null($value) ? $value : json_encode($value);
    }
}
