<?php

namespace Guava\FilamentTutorials\Concerns;

use Closure;

trait HasDescription
{
    public string|Closure|null $description = null;

    public bool|Closure $hiddenDescription = false;

    public function description(string|Closure $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->evaluate($this->description);
    }

    public function hiddenDescription(bool|Closure $condition = true): static
    {
        $this->hiddenDescription = $condition;

        return $this;
    }

    public function isDescriptionHidden(): bool
    {
        return $this->evaluate($this->hiddenDescription);
    }
}
