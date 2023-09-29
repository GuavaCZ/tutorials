<?php

namespace Guava\Tutorials\Concerns;

use Livewire\Component;

trait HasLivewire
{
    protected ?Component $livewire = null;

    public function getLivewire(): ?Component
    {
        return $this->livewire;
    }
}
