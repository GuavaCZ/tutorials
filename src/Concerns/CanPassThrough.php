<?php

namespace Guava\Tutorials\Concerns;

use Closure;

trait CanPassThrough
{
    protected bool | Closure $passThrough = true;

    public function passThrough(Closure | bool $condition = true): static
    {
        $this->passThrough = $condition;

        return $this;
    }

    public function shouldPassThrough(): bool | Closure
    {
        return $this->evaluate($this->passThrough);
    }
}
