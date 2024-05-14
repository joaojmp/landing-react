<?php

namespace Src\Posts\Services;

use Src\Service;
use Src\Posts\Repositories\ImageRepository;

class ImageService extends Service
{
    /**
     * Array to store file configurations.
     *
     * @var array
     */
    protected array $files = [
        [
            "attribute" => "name",
            "oldAttribute" => "old_name",
            "baseNameAttribute" => "legend",
            "blur" => true,
            "fit" => [
                [
                    "prefix" => "thumb_",
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
    protected string $folder = "posts/images";

    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return ImageRepository::class;
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
