<?php

namespace Src;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Repository
 * 
 * @abstract
 *
 * This abstract class serves as a base repository for interacting with Eloquent models and their relationships.
 */
abstract class Repository
{
    /**
     * The Eloquent model instance.
     *
     * @var Model
     */
    protected Model $model;

    /**
     * Array to store relationships configuration.
     *
     * @var array
     */
    protected array $relations = [];

    /**
     * Repository constructor.
     *
     * Instantiates the Eloquent model associated with the repository.
     */
    public function __construct()
    {
        $this->model = app()->make($this->model());
    }

    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    abstract protected function model(): string;

    /**
     * Create a new record in the database along with any specified relationships.
     *
     * @param array $attributes
     * 
     * @return Model
     */
    public function create(array $attributes): Model
    {
        DB::beginTransaction();

        $object = $this->model->create($attributes);

        if ($this->hasRelations()) {
            $this->saveRelations($this->relations, $object);
        }

        DB::commit();

        return $object;
    }

    /**
     * Update an existing record in the database along with any specified relationships.
     *
     * @param array $attributes
     * @param int $id
     * 
     * @return Model
     */
    public function update(array $attributes, int $id): Model
    {
        DB::beginTransaction();

        $object = $this->model->find($id);
        $object->update($attributes);

        if ($this->hasRelations()) {
            $this->saveRelations($this->relations, $object);
        }

        DB::commit();

        return $object;
    }

    /**
     * Delete a record from the database.
     *
     * @param int $id
     * 
     * @return Model
     */
    public function delete(int $id): Model
    {
        $object = $this->model->find($id);
        $object->delete();

        return $object;
    }

    /**
     * Dynamically call methods on the underlying Eloquent model.
     *
     * @param string $method
     * @param array $parameters
     * 
     * @return mixed
     */
    public function __call(string $method, array $parameters): mixed
    {
        return call_user_func_array([$this->model, $method], $parameters);
    }

    /**
     * Set the relationships configuration for the repository.
     *
     * @param array $relations
     * 
     * @return void
     */
    public function setRelations(array $relations): void
    {
        $this->relations = $relations;
    }

    /**
     * Check if the repository has any defined relationships.
     *
     * @return bool
     */
    protected function hasRelations(): bool
    {
        return !empty($this->relations);
    }

    /**
     * Save specified relationships for a given Eloquent model.
     *
     * @param array $relations
     * @param Model $object
     * 
     * @return void
     */
    protected function saveRelations(array $relations, Model $object): void
    {
        foreach ($relations as $name => $relation) {
            call_user_func_array([$this, $relation["type"]], compact("name", "relation", "object"));
        }
    }

    /**
     * Save a one-to-one relationship for a given Eloquent model.
     *
     * @param string $name
     * @param array $relation
     * @param Model $object
     * 
     * @return void
     */
    protected function oneToOne(string $name, array $relation, Model $object): void
    {
        $attributes = $relation["attributes"];
        $relationship = call_user_func([$object, $name]);
        $saved = $relationship->updateOrCreate(["id" => $attributes["id"] ?? null], $attributes);

        if (class_basename($relationship) === "BelongsTo") {
            call_user_func(
                [$object, "update"],
                [$name . "_id" => $saved->id]
            );
        }

        if ($this->hasSubrelations($relation)) {
            $this->saveRelations($relation["relations"], $saved);
        }
    }

    /**
     * Save a one-to-many relationship for a given Eloquent model.
     *
     * @param string $name
     * @param array $relation
     * @param Model $object
     * 
     * @return void
     */
    protected function oneToMany(string $name, array $relation, Model $object): void
    {
        $this->deleteDeprecatedOneToMany($name, $relation, $object);

        foreach ($relation["items"] as $attributes) {
            $saved = call_user_func([$object, $name])->updateOrCreate(["id" => $attributes["id"] ?? null], $attributes);

            if ($this->hasSubrelations($attributes)) {
                $this->saveRelations($attributes["relations"], $saved);
            }
        }
    }

    /**
     * Delete deprecated one-to-many relationships for a given Eloquent model.
     *
     * @param string $name
     * @param array $relation
     * @param Model $object
     * 
     * @return void
     */
    protected function deleteDeprecatedOneToMany(string $name, array $relation, Model $object): void
    {
        $idsToUpdate = collect($relation["items"])->reduce(function ($array, $attributes) {
            if (isset($attributes["id"]) && !empty($attributes["id"])) {
                $array[] = $attributes["id"];
            }

            return $array;
        }, []);

        call_user_func([$object, $name])->whereNotIn("id", $idsToUpdate)->delete();
    }

    /**
     * Check if a relationship has sub-relations.
     *
     * @param array $relation
     * 
     * @return bool
     */
    protected function hasSubrelations(array $relation): bool
    {
        return isset($relation["relations"]) && !empty($relation["relations"]);
    }

    /**
     * Save a many-to-many relationship for a given Eloquent model.
     *
     * @param string $name
     * @param array $relation
     * @param Model $object
     * 
     * @return void
     */
    protected function manyToMany(string $name, array $relation, Model $object): void
    {
        call_user_func([$object, $name])->sync($relation["ids"]);
    }
}
