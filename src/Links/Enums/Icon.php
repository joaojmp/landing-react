<?php

namespace Src\Links\Enums;

use Src\Enum;

abstract class Icon extends Enum
{
    const INSTAGRAM = 0;
    const FACEBOOK = 1;
    const TWITTER = 2;
    const YOUTUBE = 3;
    const LINKEDIN = 4;
    const PINTEREST = 5;
    const WHATSAPP = 6;
    const EMAIL = 7;
    const LOCALIZATION = 8;

    /**
     * Get an array containing all the elements of the enumeration class.
     *
     * @return array An array containing all the elements of the enumeration class.
     */
    protected static function all(): array
    {
        return [
            'Instagram',
            'Facebook',
            'Twitter',
            'Youtube',
            'Linkedin',
            'Pinterest',
            'Whatsapp',
            'E-mail',
            'Localização'
        ];
    }
}
