<?php

namespace Guava\FilamentTutorials\Selectors;

use Livewire\Wireable;

abstract class Selector implements Wireable
{
    abstract public function __toString(): string;

}
