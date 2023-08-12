<?php

namespace Guava\Tutorials\Concerns;

use Closure;
use Guava\Tutorials\Filament\TutorialAction;

trait HasAction
{
    public TutorialAction | Closure | null $action = null;

    public bool | Closure $hiddenAction = false;

    public function action(TutorialAction | Closure $action): static
    {
        $this->action = $action;

        return $this;
    }

    public function getAction(): ?TutorialAction
    {
        return $this->evaluate($this->action);
    }

    public function hiddenAction(bool | Closure $condition = true): static
    {
        $this->hiddenAction = $condition;

        return $this;
    }

    public function isActionHidden(): bool
    {
        return $this->evaluate($this->hiddenAction);
    }
}
