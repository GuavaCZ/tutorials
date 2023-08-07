<?php

namespace Guava\FilamentTutorials;

use Filament;
use Filament\Contracts\Plugin;
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Guava\FilamentTutorials\Livewire\Components\Tutorials;
use Illuminate\Support\Facades\Blade;
use Livewire\Livewire;

class FilamentTutorialsPlugin implements Plugin
{
    public function getId(): string
    {
        return 'guava::filament-tutorials';
    }

    public function register(Filament\Panel $panel): void
    {
        Livewire::component('filament-tutorials::tutorials', Tutorials::class);

        $panel->renderHook(
            'panels::body.start',
            fn (): string => Blade::render('@livewire(\'filament-tutorials::tutorials\')'),
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
