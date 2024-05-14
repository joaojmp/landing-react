<?php

namespace Src\Posts\Repositories;

use Src\Repository;
use Src\Posts\Models\Description;

class DescriptionRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Description::class;
    }
}
