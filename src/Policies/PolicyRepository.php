<?php

namespace Src\Policies;

use Src\Repository;
use Src\Policies\Policy;

class PolicyRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Policy::class;
    }
}
