<?php

namespace Guava\FilamentTutorials\Concerns;

use Closure;

trait HasHint
{
    public string | Closure | null $hint = null;

    public bool | Closure $hiddenHint = false;

    public function hint(string | Closure | null $hint): static
    {
        $this->hint = $hint;

        return $this;
    }

    public function getHint(): ?string
    {
        return $this->evaluate($this->hint, [
            //            'livewire' => $this->getLivewire(),
            //            'index' => $this->getIndex(),
            //            'steps' => $this->getSteps(),
        ]);
    }

    public function hiddenHint(bool | Closure $condition = true): static
    {
        $this->hiddenHint = $condition;

        return $this;
    }

    public function isHintHidden(): bool
    {
        return $this->evaluate($this->hiddenHint);
    }
}
