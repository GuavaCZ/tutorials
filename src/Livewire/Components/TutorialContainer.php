<?php

namespace Guava\FilamentTutorials\Livewire\Components;

use Closure;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Support\Contracts\TranslatableContentDriver;
use Guava\FilamentTutorials\Step;
use Guava\FilamentTutorials\Tutorial\Tutorial;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\Js;
use Livewire\Component;

class TutorialContainer extends Component implements HasActions
{
    use InteractsWithActions;

    //    public Tutorial $tutorial;
    //
    //    public int $currentStep = 1;

    public array $steps;

    protected string $activeStepKey = '';

    public function activeStepKey(string $activeStepKey): static
    {
        $this->activeStepKey = $activeStepKey;

        return $this;
    }

    public function getActiveStepKey(): string
    {
        return $this->activeStepKey;
    }

    public function getActiveStep(): ?Step
    {
        return $this->getStep($this->getActiveStepKey());
    }

    public function setActiveStep(string $step): void
    {
        $this->activeStepKey = $step;
    }

    public function getStep(string | Closure $findStepUsing, bool $withHidden = false): ?Step
    {
        if (is_string($findStepUsing)) {
            $findStepUsing = static function (Step $step) use ($findStepUsing): bool {
                $key = $step->getKey();

                if ($key === null) {
                    return false;
                }

                return $key === $findStepUsing;
            };
        }

        return collect($this->steps)->first($findStepUsing);
    }

    //public $livewire;
    //
    public function mount(array $steps): void
    {
        $this->steps = $steps;
        //        $this->livewire = request()->route()->controller;
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
