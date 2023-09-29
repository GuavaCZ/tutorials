<?php

namespace Guava\Tutorials\Concerns;

use Closure;

trait CanInterceptClick
{
    protected bool | Closure $interceptClick = false;

    protected string | Closure $interceptClickAction = 'nextTutorialStep';

    public function interceptClick(Closure | bool $condition = true): static
    {
        $this->interceptClick = $condition;

        return $this;
    }

    public function shouldInterceptClick(): bool | Closure
    {
        return $this->evaluate($this->interceptClick);
    }

    public function interceptClickAction(string | Closure $action = 'nextTutorialStep()'): static
    {
        $this->interceptClickAction = $action;

        return $this;
    }

    public function getInterceptClickAction(): string
    {
        return $this->evaluate($this->interceptClickAction);
    }
}
