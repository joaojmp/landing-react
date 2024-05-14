<?php

namespace Src\Posts\Services;

use Exception;
use Src\Service;
use Src\Posts\Repositories\SubjectRepository;

class SubjectService extends Service
{
    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return SubjectRepository::class;
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
     * Delete a record from the database and associated files.
     *
     * @param int $id
     * 
     * @return void
     */
    public function delete(int $id): void
    {
        $subject = $this->find($id);

        if ($subject->posts->count()) {
            throw new Exception("Antes é necessário apagar todas as publicações relacionadas.", 1);
        }

        parent::delete($id);
    }
}
