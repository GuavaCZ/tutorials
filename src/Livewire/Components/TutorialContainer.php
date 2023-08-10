<?php

namespace Guava\Tutorials\Livewire\Components;

use Closure;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Support\Contracts\TranslatableContentDriver;
use Guava\Tutorials\Steps\Step;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Arr;
use Livewire\Attributes\Js;
use Livewire\Component;

class TutorialContainer extends Component implements HasActions
{
    use InteractsWithActions;

    //    public Tutorial $tutorial;
    //
    //    public int $currentStep = 1;


    public array $steps;

    public ?string $activeStepKey = null;

    public int $activeStepIndex = 0;

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

    public function nextStep(): void
    {
        $this->activeStepIndex++;
        $step = Arr::get(array_values($this->steps), $this->activeStepIndex);

        if ($step) {
            $this->setActiveStep($step->getKey());
        } else {
            $this->complete();
        }
    }

    public function begin(): void
    {
        $this->activeStepKey = Arr::first($this->steps)->getKey();
    }

    public function complete(): void
    {
        $this->activeStepKey = null;
//        $this->tutorial->callAfterCompleted();
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
        $this->begin();
        //        $this->livewire = request()->route()->controller;
    }

    public function render(): View
    {
        return view('tutorials::livewire.tutorial-container');
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
