<?php

namespace Guava\Tutorials\Concerns;

use Closure;

trait HasLifecycleEvents
{
    public ?Closure $afterMount = null;

    public ?Closure $beforeUnmount = null;

    protected ?Closure $afterCompleted = null;

    protected ?Closure $afterSkipped = null;

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

    public function afterSkipped(Closure $callback): static
    {
        $this->afterSkipped = $callback;

        return $this;
    }

    public function callAfterSkipped(): static
    {
        if ($callback = $this->afterSkipped) {
            $this->evaluate($callback);
        }

        return $this;
    }
}
