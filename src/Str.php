<?php

namespace Src;

/**
 * Class Str
 *
 * This class provides utility methods for manipulating Portuguese (Brazil) words, specifically for handling pluralization,
 * singularization, and extracting only numeric characters from a string.
 *
 * @package Src
 */
class Str
{
    /**
     * Rules to match for pluralization.
     *
     * @var array
     */
    public static array $rules = [
        "ão" => "ões",
        "ês" => "eses",
        "m"  => "ns",
        "l"  => "is",
        "r"  => "res",
        "x"  => "xes",
        "z"  => "zes",
    ];

    /**
     * Exceptions to the pluralization rules.
     *
     * @var array
     */
    public static array $exceptions = [
        "cidadão"  => "cidadãos",
        "mão"      => "mãos",
        "qualquer" => "quaisquer",
        "campus"   => "campi",
        "lápis"    => "lápis",
        "ônibus"   => "ônibus",
    ];

    /**
     * Get the plural form of a Portuguese (Brazil) word.
     *
     * @param string $str The input word.
     * @return string The pluralized form of the word.
     */
    public static function plural(string $str): string
    {
        if (array_key_exists($str, self::$exceptions)) {
            return self::$exceptions[$str];
        } else {
            foreach (self::$rules as $singular => $plural) {
                if (preg_match("({$singular}$)", $str)) {
                    return preg_replace("({$singular}$)", $plural, $str);
                }
            }
        }

        return substr($str, -1) !== "s" ? $str . "s" : $str;
    }

    /**
     * Get the singular form of a Portuguese (Brazil) word.
     *
     * @param string $str The input word.
     * @return string The singularized form of the word.
     */
    public static function singular(string $str): string
    {
        if (in_array($str, self::$exceptions)) {
            $invert = array_flip(self::$exceptions);

            return $invert[$str];
        } else {
            foreach (self::$rules as $singular => $plural) {
                if (preg_match("({$plural}$)", $str)) {
                    return preg_replace("({$plural}$)", $singular, $str);
                }
            }
        }

        return substr($str, -1) == "s" ? substr($str, 0, -1) : $str;
    }

    /**
     * Clear string, retaining only numeric characters.
     *
     * @param string $str The input string.
     * @return string The string containing only numeric characters.
     */
    public static function onlyNumbers(string $str): string
    {
        return preg_replace("/[^0-9]/", "", $str);
    }
}
