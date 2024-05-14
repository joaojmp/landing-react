<?php

namespace Src\Banners;

use Src\Repository;
use Src\Banners\Banner;

class BannerRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Banner::class;
    }
}
