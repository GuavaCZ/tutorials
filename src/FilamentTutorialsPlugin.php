<?php

namespace Guava\FilamentTutorials;

use Filament;
use Filament\Contracts\Plugin;
use Guava\FilamentTutorials\Contracts\HasTutorials;
use Guava\FilamentTutorials\Livewire\Components\StepContainer;
use Guava\FilamentTutorials\Livewire\Components\TutorialContainer;
use Guava\FilamentTutorials\View\Components\Tutorials;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\View;
use Livewire\Livewire;

class FilamentTutorialsPlugin implements Plugin
{
    public function getId(): string
    {
        return 'guava::tutorials';
    }

    public function register(Filament\Panel $panel): void
    {
        Livewire::component('tutorials::tutorial-container', TutorialContainer::class);
        Livewire::component('tutorials::step-container', StepContainer::class);

        $panel->renderHook(
            'panels::body.start',
            fn (): View => view('tutorials::render-hook', [
                'livewire' => request()->route()->controller instanceof HasTutorials
                    ? request()->route()->controller
                    : null,
            ]),
            //            fn (): string => Blade::renderComponent(new Tutorials()),
        );
    }

    public function boot(Filament\Panel $panel): void
    {
    }

    public static function make(): static
    {
        return app(static::class);
    }
}
