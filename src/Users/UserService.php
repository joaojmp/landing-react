<?php

namespace Src\Users;

use Src\Service;
use Src\Users\UserRepository;

class UserService extends Service
{
    /**
     * Array to store file configurations.
     *
     * @var array
     */
    protected array $files = [
        [
            "attribute" => "photo",
            "oldAttribute" => "old_photo",
            "blur" => true,
            "fit" => [
                [
                    "width" => 800,
                    "height" => 800
                ]
            ]
        ]
    ];

    /**
     * Folder where files are stored.
     *
     * @var string
     */
    protected string $folder = "users";

    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return UserRepository::class;
    }
}
