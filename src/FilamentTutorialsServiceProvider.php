<?php

namespace Guava\FilamentTutorials;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Guava\FilamentTutorials\View\Components\StepContainer;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentTutorialsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('filament-tutorials')
            ->hasViews()
            ->hasViewComponents('filament-tutorials',
                StepContainer::class,
            )
        ;
    }

    public function packageBooted(): void
    {
        FilamentAsset::register([
            AlpineComponent::make('tutorials', __DIR__.'/../resources/js/dist/components/tutorials.js'),
        ], package: 'guava/filament-tutorials');
    }
}
