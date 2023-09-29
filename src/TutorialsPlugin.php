<?php

namespace Guava\Tutorials;

use Filament;
use Filament\Contracts\Plugin;
use Guava\Tutorials\Contracts\HasTutorials;
use Illuminate\View\View;

class TutorialsPlugin implements Plugin
{
    protected bool $shouldShowTutorialsMenu = false;

    public function getId(): string
    {
        return 'guava::tutorials';
    }

    public function shouldShowTutorialsMenu(bool $condition = true): static
    {
        $this->shouldShowTutorialsMenu = $condition;

        return $this;
    }

    public function isShouldShowTutorialsMenu(): bool
    {
        return $this->shouldShowTutorialsMenu;
    }

    public function register(Filament\Panel $panel): void
    {
        if ($this->isShouldShowTutorialsMenu()) {
            $panel->renderHook(
                'panels::user-menu.after',
                fn (): string | View => request()->route()->controller instanceof HasTutorials
                    ? view('tutorials::components.help', [
                        'livewire' => request()->route()->controller,
                    ])
                    : '',
            );
        }
    }

    public function boot(Filament\Panel $panel): void
    {
    }

    public static function make(): static
    {
        return app(static::class);
    }
}
