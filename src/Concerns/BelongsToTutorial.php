<?php

namespace Guava\FilamentTutorials\Concerns;

use Closure;
use Guava\FilamentTutorials\Tutorial\Tutorial;

trait BelongsToTutorial
{
    public ?Tutorial $tutorial = null;

    public function tutorial(Tutorial $tutorial): static
    {
        $this->tutorial = $tutorial;

        return $this;
    }

    public function getTutorial(): ?Tutorial
    {
        return $this->tutorial;
    }

}
