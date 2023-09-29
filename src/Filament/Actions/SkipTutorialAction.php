<?php

namespace Guava\Tutorials\Filament\Actions;

use Guava\Tutorials\Filament\TutorialAction;
use Guava\Tutorials\Tutorial;

class SkipTutorialAction extends TutorialAction
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn (Tutorial $tutorial) => ! $tutorial->isFirstStep());

        $this->icon('heroicon-o-forward');

        $this->label(__('tutorials::step.skip'));

        $this->action('skipTutorial()');
    }

    public static function getDefaultName(): ?string
    {
        return 'skip-tutorial';
    }
}
