<?php

namespace Guava\FilamentTutorials\Livewire\Components;

use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Support\Contracts\TranslatableContentDriver;
use Guava\FilamentTutorials\Tutorial\Tutorial;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\Js;
use Livewire\Component;

class TutorialContainer extends Component implements HasActions
{
    use InteractsWithActions;

    public Tutorial $tutorial;

    public int $currentStep = 1;

    public function mount(Tutorial $tutorial): void
    {
        $this->tutorial = $tutorial;
    }

    public function render(): View
    {
        return view('filament-tutorials::livewire.tutorial-container');
    }

    #[Js]
    public function continue(): string
    {
        return <<<'js'
            $wire.currentStep++;
js;
    }

    public function makeFilamentTranslatableContentDriver(): ?TranslatableContentDriver
    {
        return null;
    }
}
