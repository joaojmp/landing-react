<?php

namespace Src\Banners;

use Src\Service;
use Src\Banners\BannerRepository;

class BannerService extends Service
{
    /**
     * Array to store file configurations.
     *
     * @var array
     */
    protected array $files = [
        [
            "attribute" => "desktop",
            "oldAttribute" => "old_desktop",
            "baseNameAttribute" => "title",
            "blur" => true,
            "fit" => [
                [
                    "width" => 1920,
                    "height" => 700
                ]
            ]
        ],
        [
            "attribute" => "tablet",
            "oldAttribute" => "old_tablet",
            "baseNameAttribute" => "title",
            "blur" => true,
            "fit" => [
                [
                    "width" => 768,
                    "height" => 300
                ]
            ]
        ],
        [
            "attribute" => "mobile",
            "oldAttribute" => "old_mobile",
            "baseNameAttribute" => "title",
            "blur" => true,
            "fit" => [
                [
                    "width" => 425,
                    "height" => 500
                ]
            ]
        ]
    ];

    /**
     * Folder where files are stored.
     *
     * @var string
     */
    protected string $folder = "banners";

    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return BannerRepository::class;
    }

    /**
     * Reorders items based on the provided array of IDs.
     *
     * @param array $ids An array containing the IDs of items to be reordered.
     *
     * @return void
     */
    public function reorder(array $ids): void
    {
        foreach ($ids as $index => $id) {
            $this->repository->update(["order" => $index], $id);
        }
    }
}
