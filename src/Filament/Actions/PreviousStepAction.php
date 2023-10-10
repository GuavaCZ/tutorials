<?php

namespace Guava\Tutorials\Filament\Actions;

use Guava\Tutorials\Filament\TutorialAction;
use Guava\Tutorials\Tutorial;

class PreviousStepAction extends TutorialAction
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn (Tutorial $tutorial) => $tutorial->isFirstStep());

        $this->icon('heroicon-o-arrow-left-circle');

        $this->label(__('tutorials::step.previous'));
        $this->keyBindings('shift+tab');

        $this->action('previousTutorialStep()');
    }

    public static function getDefaultName(): ?string
    {
        return 'previous-step';
    }
}
