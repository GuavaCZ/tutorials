<?php

namespace Guava\Tutorials\Concerns;

use Closure;

trait CanBeInteracted
{
    protected bool | Closure $interactive = true;

    public function interactive(bool | Closure $condition = true): static
    {
        $this->interactive = $condition;

        return $this;
    }

    public function isInteractive(): bool
    {
        return $this->evaluate($this->interactive);
    }
}
