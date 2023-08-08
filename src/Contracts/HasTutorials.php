<?php

namespace Guava\FilamentTutorials\Contracts;

use Guava\FilamentTutorials\Tutorial;

interface HasTutorials
{
    public function getTutorial(string $name): ?Tutorial;

    public function isCachingForms(): bool;
}
