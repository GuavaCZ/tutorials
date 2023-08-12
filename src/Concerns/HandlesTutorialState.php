<?php

namespace Guava\Tutorials\Concerns;

trait HandlesTutorialState
{
    public int $index = 0;

    public function nextTutorialStep()
    {
        $this->index++;

        if ($this->index >= $this->getTotalSteps()) {
            $this->completeTutorial();
        }
    }

    public function completeTutorial()
    {
        $this->index = 0;

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
