<?php

namespace Src\Links;

use Src\Service;
use Src\Links\LinkRepository;

class LinkService extends Service
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
            "resize" => [
                [
                    "width" => 50,
                    "height" => 50
                ]
            ]
        ]
    ];

    /**
     * Folder where files are stored.
     *
     * @var string
     */
    protected string $folder = "links";

    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return LinkRepository::class;
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

    /**
     * Update an existing record in the database along with any specified relationships and files.
     *
     * @param array $attributes
     * @param int $id
     * 
     * @return mixed
     */
    public function update(array $attributes, int $id): mixed
    {
        $link = $this->find($id);

        if ($attributes["icon"] && $link->image) {
            $this->deleteOneFile($link->id, "image");
        }

        return parent::update($attributes, $id);
    }
}
