<?php

namespace Guava\Tutorials\Contracts;

use Guava\Tutorials\Tutorial;
use Illuminate\Database\Eloquent\Model;

/**
 * @method string getModel()
 * @method Model getRecord()
 */
interface HasTutorials
{
    public function getTutorial(string $name): ?Tutorial;

    public function isCachingForms(): bool;
}
