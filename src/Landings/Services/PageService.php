<?php

namespace Src\Landings\Services;

use Src\Service;
use Src\Landings\Repositories\PageRepository;

class PageService extends Service
{
    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return PageRepository::class;
    }
}
