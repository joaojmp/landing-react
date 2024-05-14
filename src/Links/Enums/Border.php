<?php

namespace Src\Links\Enums;

use Src\Enum;

abstract class Border extends Enum
{
    const BORDER_1 = 0;
    const BORDER_2 = 1;
    const BORDER_3 = 2;

    /**
     * Get an array containing all the elements of the enumeration class.
     *
     * @return array An array containing all the elements of the enumeration class.
     */
    protected static function all(): array
    {
        return [
            'Bordas quadradas',
            'Bordas arredondadas',
            'Bordas pílulas',
        ];
    }
}
