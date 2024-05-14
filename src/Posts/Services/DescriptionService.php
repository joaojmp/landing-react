<?php

namespace Src\Posts\Services;

use Src\Service;
use Src\Posts\Repositories\DescriptionRepository;

class DescriptionService extends Service
{
    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return DescriptionRepository::class;
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
