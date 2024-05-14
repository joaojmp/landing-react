<?php

namespace Src\Posts\Services;

use Src\Service;
use Src\Posts\Services\ImageService;
use Src\Posts\Repositories\PostRepository;

class PostService extends Service
{
    /**
     * Specify relations included in create and update.
     *
     * @var array
     */
    protected array $relations = [
        "descriptions" => [
            "type" => "oneToMany"
        ],
    ];

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
            "blur" => true,
            "fit" => [
                [
                    "width" => 800,
                    "height" => 800
                ]
            ],
        ],
        "nested" => [
            "descriptions.*.image" => [
                "oldAttribute" => "old_image",
                "baseNameAttribute" => "title",
                "blur" => true,
                "fit" => [
                    [
                        "width" => 800,
                        "height" => 800
                    ]
                ],
            ]
        ]
    ];

    /**
     * Folder where files are stored.
     *
     * @var string
     */
    protected string $folder = "posts";

    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return PostRepository::class;
    }

    /**
     * Delete a record from the database and associated files.
     *
     * @param int $id
     * 
     * @return void
     */
    public function delete(int $id): void
    {
        $post = $this->find($id);

        if ($post->images->count()) {
            $imageService = new ImageService;

            foreach ($post->images as $image) {
                $imageService->delete($image->id);
            }
        }

        parent::delete($id);
    }
}
