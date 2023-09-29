<?php

namespace Guava\Tutorials\Filament\Actions;

use Filament\Forms\Components\Component;
use Guava\Tutorials\Filament\TutorialAction;
use Guava\Tutorials\Tutorial;

class NextStepAction extends TutorialAction
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn (Tutorial $tutorial) => $tutorial->isLastStep());

        $this->disabled(
            fn (?Component $component) => $component && $component->isLive() && $component->isRequired() && empty($component->getState())
        );

        $this->icon('heroicon-o-arrow-right-circle');

        $this->label(__('tutorials::step.next'));

//        $this->keyBindings('tab');

        $this->action('nextTutorialStep()');
    }

    public static function getDefaultName(): ?string
    {
        return 'next-step';
    }
}
