<?php

namespace Src\Links\Enums;

use Src\Enum;

abstract class Type extends Enum
{
    const DEFAULT = 0;
    const BLANK = 1;
    const EMAIL = 2;
    const PHONE = 3;

    /**
     * Get an array containing all the elements of the enumeration class.
     *
     * @return array An array containing all the elements of the enumeration class.
     */
    protected static function all(): array
    {
        return [
            'Padrão',
            'Nova página',
            'E-mail',
            'Telefone',
        ];
    }
}
