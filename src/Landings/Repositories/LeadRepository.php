<?php

namespace Src\Landings\Repositories;

use Src\Repository;
use Src\Landings\Models\Lead;

class LeadRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Lead::class;
    }
}
