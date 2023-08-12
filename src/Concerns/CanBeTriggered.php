<?php

namespace Guava\Tutorials\Concerns;

use Closure;

trait CanBeTriggered
{
    protected bool | Closure $shouldTriggerWhen = false;


    public function trigger(bool | Closure $condition = true): static
    {
        return $this->shouldTriggerWhen($condition);
    }

    public function shouldTriggerWhen(bool | Closure $condition = true): static
    {
        $this->shouldTriggerWhen = $condition;

        return $this;
    }

    public function isTriggered(): bool
    {
        $livewire = $this->getLivewire();
        if ($cachedValue = data_get($livewire, 'mountedTutorialData.triggered') !== null) {
            return $cachedValue;
        }

        $response = $this->evaluate($this->shouldTriggerWhen);
        data_set($livewire, 'mountedTutorialData.triggered', $response);
        return $response;
    }
}
