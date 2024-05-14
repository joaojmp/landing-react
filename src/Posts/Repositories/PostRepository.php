<?php

namespace Src\Posts\Repositories;

use Src\Repository;
use Src\Posts\Models\Post;

class PostRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return Post::class;
    }
}
