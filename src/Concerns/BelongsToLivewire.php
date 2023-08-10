<?php

namespace Guava\Tutorials\Concerns;

use Guava\Tutorials\Contracts\HasTutorials;

trait BelongsToLivewire
{
    protected HasTutorials $livewire;

    public function livewire(HasTutorials $livewire): static
    {
        $this->livewire = $livewire;

        return $this;
    }

    public function getLivewire(): HasTutorials
    {
        return $this->livewire;
    }
}
