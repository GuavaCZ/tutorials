<?php

namespace Guava\FilamentTutorials\Concerns;

use Livewire\Component;
use Livewire\Livewire;

trait HasLivewire
{
    protected ?Component $livewire = null;

    public function getLivewire(): ?Component
    {
        return $this->livewire;
    }
}
