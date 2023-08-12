<?php

namespace Guava\Tutorials\Concerns;

use Closure;

trait HasLifecycleEvents
{
    public ?Closure $afterMount = null;

    public ?Closure $beforeUnmount = null;

    public function afterMount(Closure $callback): static
    {
        $this->afterMount = $callback;

        return $this;
    }

    public function callAfterMount(): void
    {
        $this->evaluate($this->afterMount);
    }

    public function beforeUnmount(Closure $callback): static
    {
        $this->beforeUnmount = $callback;

        return $this;
    }

    public function callBeforeUnmount(): void
    {
        $this->evaluate($this->beforeUnmount);
    }
}
