<?php

namespace Guava\FilamentTutorials\Concerns;

use Closure;

trait CanBeCompleted
{
    protected ?Closure $afterCompleted = null;

    public function afterCompleted(Closure $callback): static
    {
        $this->afterCompleted = $callback;

        return $this;
    }

    public function callAfterCompleted(): static
    {
        if ($callback = $this->afterCompleted) {
            $this->evaluate($callback);
        }

        return $this;
    }
}
