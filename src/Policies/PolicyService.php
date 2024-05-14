<?php

namespace Src\Policies;

use Exception;
use Src\Service;
use Src\Policies\PolicyRepository;

class PolicyService extends Service
{
    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return PolicyRepository::class;
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
        $policy = $this->find($id);

        if ($policy->fixed) {
            throw new Exception();
        }

        parent::delete($id);
    }
}
