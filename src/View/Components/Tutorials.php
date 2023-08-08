<?php

namespace Guava\FilamentTutorials\View\Components;

use Guava\FilamentTutorials\Contracts\HasTutorials;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Tutorials extends Component
{
    public bool $enabled = false;

    public array $tutorials = [];

    public function __construct()
    {
        $controller = request()->route()->controller;

        if ($controller instanceof HasTutorials) {
            $this->enabled = true;
            $this->tutorials = $controller->getTutorials();
        }
    }

    public function render(): View
    {
        return view('filament-tutorials::components.tutorials');
    }
}
