<?php

namespace Src;

use ReflectionClass;

/**
 * Enum is an abstract class providing a base implementation for creating enumerations in PHP.
 *
 * @abstract
 */
abstract class Enum
{
    /**
     * Get all the elements defined in the enumeration class.
     *
     * @abstract
     * 
     * @return array An array containing all the elements of the enumeration class.
     */
    abstract protected static function all(): array;

    /**
     * Get an array containing all the elements of the enumeration class.
     *
     * @return array An array containing all the elements of the enumeration class.
     */
    public static function getAll(): array
    {
        return static::all();
    }

    /**
     * Get a string value from the enumeration based on the input integer value.
     *
     * @param int $value The index of the element to retrieve from the enumeration.
     *
     * @return string|false A string value if the index is valid, otherwise false.
     */
    public static function get(int $value): string|false
    {
        if (!self::isValid($value)) {
            return false;
        }

        return static::all()[$value];
    }

    /**
     * Check if a given value is valid within the enumeration.
     *
     * @param int $value The value to be checked.
     *
     * @return bool True if the value is valid, otherwise false.
     */
    final public static function isValid(int $value): bool
    {
        return in_array($value, self::toArray());
    }

    /**
     * Get an array containing all the constants defined in the enumeration class.
     *
     * @return array An array containing all the constants defined in the enumeration class.
     */
    final public static function toArray(): array
    {
        return (new ReflectionClass(static::class))->getConstants();
    }
}
