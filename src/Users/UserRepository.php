<?php

namespace Src\Users;

use Src\Repository;
use Src\Users\User;

class UserRepository extends Repository
{
    /**
     * Abstract method to define the Eloquent model class name.
     *
     * @return string
     */
    protected function model(): string
    {
        return User::class;
    }
}
