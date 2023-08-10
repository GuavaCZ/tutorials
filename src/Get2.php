<?php

namespace Guava\Tutorials;

use Filament\Forms\Components\Component;

class Get2
{
    public function __construct(
        protected \Livewire\Component $livewire,
    ) {
    }

    public function __invoke(string | Component $path, bool $isAbsolute = false): mixed
    {
//        $livewire = $this->component->getLivewire();

        return data_get(
            $this->livewire,
$path,
//            $this->component->generateRelativeStatePath($path, $isAbsolute)
        );
    }

}