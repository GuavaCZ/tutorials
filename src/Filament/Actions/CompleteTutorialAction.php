<?php

namespace Guava\Tutorials\Filament\Actions;

use Guava\Tutorials\Filament\TutorialAction;
use Guava\Tutorials\Tutorial;

class CompleteTutorialAction extends TutorialAction
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn (Tutorial $tutorial) => ! $tutorial->isLastStep());

        $this->icon('heroicon-o-check-circle');

        $this->label(__('tutorials::step.complete'));

        $this->action('completeTutorial()');
    }

    public static function getDefaultName(): ?string
    {
        return 'complete-step';
    }
}
