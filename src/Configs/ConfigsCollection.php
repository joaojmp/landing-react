<?php

namespace Src\Configs;

use Illuminate\Database\Eloquent\Collection;

class ConfigsCollection extends Collection
{
    /**
     * Get the value of a configuration key.
     *
     * @param string $key   The configuration key.
     * @param bool   $first Whether to return only the first value if multiple values exist for the key.
     * 
     * @return mixed The configuration value.
     */
    public function get($key, $first = false): mixed
    {
        $value = $this->where("name", $key)->pluck("content");

        if ($first) {
            $value = $value->first();
        }

        return $value;
    }

    /**
     * Magic method to get the value of a configuration key.
     *
     * This method is triggered when trying to access a property of the object.
     *
     * @param mixed $key The configuration key.
     * 
     * @return mixed The configuration value.
     */
    public function __get(mixed $key): mixed
    {
        return $this->get($key, true);
    }

    /**
     * Get the scripts to be included in the head section of HTML.
     *
     * This method automatically adds a nonce attribute to script tags if not present.
     *
     * @param string|null $nonce The nonce value to be added to script tags.
     * 
     * @return string|null The scripts to be included in the head section.
     */
    public function scripts_head(string|null $nonce): string|null
    {
        $value = $this->where("name", "scripts_head")->pluck("content")->first();

        if (str_contains($value, '<script ')) {
            $value = str_replace('<script ', '<script nonce="' . $nonce . '" ', $value);
        }

        if (str_contains($value, '<script>')) {
            $value = str_replace('<script>', '<script nonce="' . $nonce . '">', $value);
        }

        return $value;
    }

    /**
     * Get the scripts to be included in the body section of HTML.
     *
     * This method automatically adds a nonce attribute to script tags if not present.
     *
     * @param string|null $nonce The nonce value to be added to script tags.
     * 
     * @return string|null The scripts to be included in the body section.
     */
    public function scripts_body(string|null $nonce): string|null
    {
        $value = $this->where("name", "scripts_body")->pluck("content")->first();

        if (str_contains($value, '<script ')) {
            $value = str_replace('<script ', '<script nonce="' . $nonce . '" ', $value);
        }

        if (str_contains($value, '<script>')) {
            $value = str_replace('<script>', '<script nonce="' . $nonce . '">', $value);
        }

        return $value;
    }
}
