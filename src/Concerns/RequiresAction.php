<?php

namespace Guava\Tutorials\Concerns;

trait RequiresAction
{
    protected bool $requiresAction = false;

    public function requiresAction(bool $condition = true): static
    {
        $this->requiresAction = $condition;

        return $this;
    }

    public function isActionRequired(): bool
    {
        return $this->requiresAction;
    }
}
