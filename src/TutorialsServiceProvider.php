<?php

namespace Guava\Tutorials;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Guava\Tutorials\Livewire\Components\StepContainer;
use Guava\Tutorials\View\Components\Tutorials;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class TutorialsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('tutorials')
            ->hasViews()
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
