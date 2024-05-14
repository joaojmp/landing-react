<?php

namespace Src\Leads;

use Src\Leads\Lead;
use Src\Repository;

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
