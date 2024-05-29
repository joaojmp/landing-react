<?php

namespace Src\Landings\Repositories;

use Src\Repository;
use Src\Landings\Models\Landing;

class LandingRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Landing::class;
    }
}
