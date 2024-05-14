<?php

namespace Src\Policies;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "fixed", "slug", "title", "description",
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

    /**
     * Set the description attribute with additional processing for handling null values.
     *
     * @param array $value The value of the "description" attribute.
     * 
     * @return void
     */
    public function setDescriptionAttribute(array $value): void
    {
        array_walk_recursive($value, function (&$item) {
            $item = null === $item ? '' : $item;
        });

        $this->attributes["description"] = json_encode($value);
    }

    /**
     * Get the description attribute as an array.
     *
     * @param string $value The value of the "description" attribute.
     * 
     * @return array
     */
    public function getDescriptionAttribute(string $value): array
    {
        return json_decode($value, true);
    }
}
