<?php

namespace Guava\FilamentTutorials\Contracts;

use Guava\FilamentTutorials\Tutorial\Tutorial;

interface HasTutorials
{
    /**
     * @return array<Tutorial>
     */
    public function getTutorials(): array;
}
