<?php

namespace Guava\FilamentTutorials\Livewire\Components;

use Filament\Actions\Action;
use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Support\Contracts\TranslatableContentDriver;
use Illuminate\Contracts\View\View;
use Livewire\Component;

class Tutorials extends Component implements HasActions
{
    use InteractsWithActions;

    public function render(): View
    {
        return view('filament-tutorials::tutorials');
    }

    public function getContinueAction()
    {
        return Action::make('continue')
            ->label('Continue')
            ->action(fn () => '')
        ;
    }

    public function makeFilamentTranslatableContentDriver(): ?TranslatableContentDriver
    {
        return null;
    }
}
