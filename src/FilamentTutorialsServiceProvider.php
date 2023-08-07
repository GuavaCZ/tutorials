<?php

namespace Guava\FilamentTutorials;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentView;
use Guava\FilamentTutorials\Contracts\HasTutorials;
use Illuminate\View\View;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentTutorialsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('filament-tutorials')
            ->hasViews()
        ;
    }

    public function packageBooted(): void
    {
        FilamentAsset::register([
            AlpineComponent::make('tutorials', __DIR__.'/../resources/js/dist/components/tutorials.js'),
        ], package: 'guava/filament-tutorials');
    }
}
