<?php

namespace Src\Configs;

use Src\Service;
use Src\Configs\ConfigRepository;

class ConfigService extends Service
{
    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    protected function repository(): string
    {
        return ConfigRepository::class;
    }

    /**
     * Update an existing record in the database along with any specified relationships and files.
     *
     * @param array $attributes
     * @param int $id
     * 
     * @return mixed
     */
    public function update($name, $content): mixed
    {
        $config = $this->where("name", $name)->first();

        return $this->repository->update(["content" => $content], $config->id);
    }

    /**
     * Delete a record from the database and associated files.
     *
     * @param int $id
     * 
     * @return void
     */
    public function delete($name): void
    {
        $configs = $this->where("name", $name)->get();

        foreach ($configs as $config) {
            $this->repository->delete($config->id);
        }
    }
}
