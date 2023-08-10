<?php

namespace Guava\Tutorials\Livewire\Components;

use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Support\Contracts\TranslatableContentDriver;
use Guava\Tutorials\Tutorial\Step;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\Js;
use Livewire\Component;

class StepContainer extends Component implements HasActions
{
    use InteractsWithActions;

    public Step $step;

    public function mount(Step $step): void
    {
        $this->step = $step;
    }

    public function render(): View
    {
        return view('tutorials::livewire.step-container');
    }

    #[Js]
    public function continue(): string
    {
        return <<<'js'
            $wire.$parent.continue();
js;
    }

    public function getContinueAction()
    {
        return Action::make('continue')
            ->label('Continue')
            ->action(null)
            ->livewireClickHandlerEnabled(false)
            ->extraAttributes([
                'style' => 'z-index: 2000',
                'x-on:click.prevent' => '$wire.continue()',
            ])
        ;
    }

    public function makeFilamentTranslatableContentDriver(): ?TranslatableContentDriver
    {
        return null;
    }
}
