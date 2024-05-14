<?php

namespace Src\Pages;

use Src\Service;
use Src\Pages\PageRepository;

class PageService extends Service
{
    /**
     * Array to store file configurations.
     *
     * @var array
     */
    protected array $files = [
        [
            "attribute" => "image",
            "oldAttribute" => "old_image",
            "baseNameAttribute" => "title",
            "fit" => [
                [
                    "width" => 1200,
                    "height" => 630
                ]
            ]
        ],
    ];

    /**
     * Folder where files are stored.
     *
     * @var string
     */
    protected string $folder = "pages";

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
