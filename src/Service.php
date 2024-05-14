<?php

namespace Src;

use Src\FileSystem;
use Illuminate\Support\Arr;

/**
 * Class Service
 * 
 * @abstract
 *
 * This abstract class serves as a base service for interacting with repositories and managing files associated with models.
 */
abstract class Service
{
    /**
     * The repository instance associated with the service.
     *
     * @var Repository
     */
    protected Repository $repository;

    /**
     * Array to store relationship configurations.
     *
     * @var array
     */
    protected array $relations = [];

    /**
     * Array to store file configurations.
     *
     * @var array
     */
    protected array $files = [];

    /**
     * Folder where files are stored.
     *
     * @var string
     */
    protected string $folder = "";

    /**
     * Service constructor.
     *
     * Instantiates the repository associated with the service.
     */
    public function __construct()
    {
        $this->repository = app()->make($this->repository());
    }

    /**
     * Abstract method to define the repository class name.
     *
     * @return string
     */
    abstract protected function repository(): string;

    /**
     * Create a new record in the database along with any specified relationships and files.
     *
     * @param array $attributes
     * 
     * @return mixed
     */
    public function create(array $attributes): mixed
    {
        $attributes = $this->saveFilesIfHas($attributes);

        if ($this->hasRelations()) {
            $this->relations = $this->mapRelations($this->relations, $attributes);
            $this->repository->setRelations($this->relations);
        }

        return $this->repository->create($attributes);
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
        $attributes = $this->saveFilesIfHas($attributes);

        if ($this->hasRelations()) {
            $this->relations = $this->mapRelations($this->relations, $attributes);
            $this->repository->setRelations($this->relations);
        }

        return $this->repository->update($attributes, $id);
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
        $object = $this->repository->delete($id);

        $this->deleteFilesIfHas($object->toArray());
    }

    /**
     * Delete a specific file associated with a record.
     *
     * @param int $id
     * @param string $file
     * 
     * @return void
     */
    public function deleteOneFile(int $id, string $file): void
    {
        $object = $this->find($id);

        if ($object->{$file}) {
            $fileSystem = $this->makeFileSystem();
            $fileSystem->deleteOneFile($object->{$file});
        }

        $object->{$file} = null;
        $object->save();
    }

    /**
     * Dynamically call methods on the underlying repository.
     *
     * @param string $method
     * @param array $parameters
     * 
     * @return mixed
     */
    public function __call(string $method, array $parameters): mixed
    {
        return call_user_func_array([$this->repository, $method], $parameters);
    }

    /**
     * Dynamically call methods on a new instance of the service.
     *
     * @param string $method
     * @param array $parameters
     * 
     * @return mixed
     */
    public static function __callStatic(string $method, array $parameters): mixed
    {
        return (new static)->$method(...$parameters);
    }

    /**
     * Check if the service has any defined relationships.
     *
     * @return bool
     */
    protected function hasRelations(): bool
    {
        return !empty($this->relations);
    }

    /**
     * Map and validate relationships based on provided attributes.
     *
     * @param array $relations
     * @param array $attributes
     * 
     * @return array
     */
    protected function mapRelations(array $relations, array $attributes): array
    {
        foreach ($relations as $name => $relation) {
            if (Arr::has($attributes, $name)) {
                $relations[$name] = call_user_func_array(
                    [$this, $relation["type"]],
                    compact("name", "relation", "attributes")
                );
            } else {
                unset($relations[$name]);
            }
        }

        return $relations;
    }

    /**
     * Maps a one-to-one relation between entities and their attributes.
     *
     * @param string $name The name of the relation.
     * @param array $relation The existing relation array to be modified.
     * @param array $attributes The array of attributes to be mapped.
     *
     * @return array The modified relation array with the mapped attributes.
     */
    protected function oneToOne(string $name, array $relation, array $attributes): array
    {
        $relation["attributes"] = Arr::pull($attributes, $name);

        if ($this->hasSubrelations($relation)) {
            $relation["relations"] = $this->mapRelations($relation["relations"], $relation["attributes"]);
        }

        return $relation;
    }

    /**
     * Maps a one-to-many relation between entities and their attributes.
     *
     * @param string $name The name of the relation.
     * @param array $relation The existing relation array to be modified.
     * @param array $attributes The array of attributes to be mapped.
     *
     * @return array The modified relation array with the mapped attributes.
     */
    protected function oneToMany(string $name, array $relation, array $attributes): array
    {
        $items = Arr::pull($attributes, $name, []);

        $items = is_null($items) ? [] : $items;

        $relation["items"] = $items;

        if ($this->hasSubrelations($relation)) {
            $relations = Arr::pull($relation, "relations");

            foreach ($relation["items"] as $index => $attributes) {
                $relation["items"][$index]["relations"] = $this->mapRelations($relations, $attributes);
            }
        }

        return $relation;
    }

    /**
     * Maps a many-to-many relation between entities and their attributes.
     *
     * @param string $name The name of the relation.
     * @param array $relation The existing relation array to be modified.
     * @param array $attributes The array of attributes to be mapped.
     *
     * @return array The modified relation array with the mapped attributes.
     */
    protected function manyToMany(string $name, array $relation, array $attributes): array
    {
        $relation["ids"] = Arr::pull($attributes, $name);

        return $relation;
    }

    /**
     * Checks if a relation has sub-relations.
     *
     * @param array $relation The relation array to be checked.
     *
     * @return bool Returns true if the relation has sub-relations, false otherwise.
     */
    protected function hasSubrelations(array $relation): bool
    {
        return isset($relation["relations"]) && !empty($relation["relations"]);
    }

    /**
     * Checks if a relation has sub-relations.
     *
     * @param array $relation The relation array to be checked.
     *
     * @return bool Returns true if the relation has sub-relations, false otherwise.
     */
    protected function hasFiles(): bool
    {
        return !empty($this->files);
    }

    /**
     * Creates a new instance of the FileSystem class with the specified files and folder.
     *
     * @return FileSystem The newly created FileSystem instance.
     */
    protected function makeFileSystem(): FileSystem
    {
        $fileSystem = new FileSystem($this->files);
        $fileSystem->setFolder($this->folder);

        return $fileSystem;
    }

    /**
     * Saves files automatically if files are present.
     *
     * @param array $attributes The array of attributes to be processed.
     *
     * @return array The modified array of attributes after saving files.
     */
    protected function saveFilesIfHas(array $attributes): array
    {
        if ($this->hasFiles()) {
            $fileSystem = $this->makeFileSystem();
            $attributes = $fileSystem->saveAutomatically($attributes);
        }

        return $attributes;
    }

    /**
     * Deletes files automatically if files are present.
     *
     * @param array $attributes The array of attributes to be processed.
     */
    protected function deleteFilesIfHas(array $attributes): void
    {
        if ($this->hasFiles()) {
            $fileSystem = $this->makeFileSystem();
            $attributes = $fileSystem->deleteAutomatically($attributes);
        }
    }

    /**
     * Get the list of files associated with the service.
     *
     * @return array
     */
    public function getFiles(): array
    {
        return $this->files;
    }

    /**
     * Get an item from the repository by its slug.
     *
     * @param string $slug The unique slug of the item.
     *
     * @return mixed Returns the item retrieved from the repository.
     */
    public function findBySlug(string $slug): mixed
    {
        return $this->repository->where("slug", $slug)->first();
    }
}
