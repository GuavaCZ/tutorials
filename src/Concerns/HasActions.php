<?php

namespace Guava\Tutorials\Concerns;

use Closure;
use Guava\Tutorials\Filament\TutorialAction;

trait HasActions
{
    /**
     * @var array<TutorialAction>|Closure|null
     */
    public array | Closure $actions = [];


    /**
     * @var array<TutorialAction>|Closure
     */
    public function actions(array | Closure $actions): static
    {
        $this->actions = $actions;

        return $this;
    }

    /**
     * @return array<TutorialAction>
     */
    public function getActions(): array
    {
        return $this->evaluate($this->actions);
    }
}
