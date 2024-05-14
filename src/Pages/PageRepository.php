<?php

namespace Src\Pages;

use Src\Pages\Page;
use Src\Repository;

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
