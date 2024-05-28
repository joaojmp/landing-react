<?php

namespace Src\Leads;

use Src\Repository;
use Src\Leads\Lead;

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
