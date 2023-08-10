<?php

namespace Guava\Tutorials\Contracts;

use Guava\Tutorials\Tutorial;

interface HasTutorials
{
    public function getTutorial(string $name): ?Tutorial;

    public function isCachingForms(): bool;
}
