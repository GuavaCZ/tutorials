<?php

namespace Guava\Tutorials\Concerns;

trait HandlesTutorialState
{
    public int $index = 0;

    public function nextTutorialStep(): void
    {
        $this->index++;

        if ($this->index >= $this->getTotalSteps()) {
            $this->completeTutorial();
        }
    }

    public function previousTutorialStep(): void
    {
        $this->index = max(0, --$this->index);
    }

    public function completeTutorial(): void
    {
        $this->index = 0;

        $this->getMountedTutorial()->callAfterCompleted();
        $this->unmountTutorial();
    }

    public function skipTutorial(): void
    {
        $this->index = 0;

        $this->getMountedTutorial()->callAfterSkipped();
        $this->unmountTutorial();
    }

    public function getIndex(bool $human = false): int
    {
        return $this->index + ($human ? 1 : 0);
    }

    public function getTotalSteps()
    {
        return $this->getMountedTutorial()->getTotalSteps();
    }
}
