<?php

namespace Guava\FilamentTutorials;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Guava\FilamentTutorials\Livewire\Components\StepContainer;
use Guava\FilamentTutorials\View\Components\Tutorials;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentTutorialsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('tutorials')
            ->hasViews()
            ->hasViewComponents('tutorials',
                Tutorials::class,
                StepContainer::class,
            )
        ;
    }

    public function packageBooted(): void
    {
        FilamentAsset::register([
            AlpineComponent::make('tutorial', __DIR__.'/../resources/js/dist/components/tutorial.js'),
            AlpineComponent::make('step', __DIR__.'/../resources/js/dist/components/step.js'),
        ], package: 'guava/tutorials');
    }
}
