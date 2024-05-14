<?php

namespace Src\Links;

use Src\Links\Link;
use Src\Repository;

class LinkRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Link::class;
    }
}
