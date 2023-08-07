<?php

namespace Guava\FilamentTutorials\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class StepContainer extends Component
{
    public function __construct() {

    }

    public function render(): View
    {
        return view('filament-tutorials::components.step-container');
    }
}
