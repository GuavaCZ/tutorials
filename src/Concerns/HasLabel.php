<?php

namespace Guava\Tutorials\Concerns;

use Closure;

trait HasLabel
{
    public string | Closure | null $label = null;

    public bool | Closure $hiddenLabel = false;

    public function label(string | Closure $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->evaluate($this->label);
    }

    public function hiddenLabel(bool | Closure $condition = true): static
    {
        $this->hiddenLabel = $condition;

        return $this;
    }

    public function isLabelHidden(): bool
    {
        return $this->evaluate($this->hiddenLabel);
    }
}
