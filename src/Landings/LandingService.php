<?php

namespace Src\Landings;

use Src\Service;
use Src\Landings\LandingRepository;

class LandingService extends Service
{
    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return LandingRepository::class;
    }
}
