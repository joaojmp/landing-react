<?php

namespace Src\Configs;

use Src\Repository;
use Src\Configs\Config;

class ConfigRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Config::class;
    }
}
