<?php

namespace Src\Landings\Repositories;

use Src\Repository;
use Src\Landings\Models\Page;

class PageRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Page::class;
    }
}
