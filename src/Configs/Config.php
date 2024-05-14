<?php

namespace Src\Configs;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class Config extends Model
{
    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        "name", "content",
    ];

    /**
     * Create a new Eloquent Collection instance.
     * 
     * @param array $models
     * 
     * @return Collection
     */
    public function newCollection(array $models = []): Collection
    {
        return new ConfigsCollection($models);
    }
}
