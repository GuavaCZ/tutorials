<?php

namespace Guava\Tutorials;

class Tutorial extends ComponentContainer
{
    public function next(): void
    {
        $this->state('index', $this->getState('index') + 1);
    }

    public function getIndex(bool $human = false): int
    {
        return $this->getState('index') + ($human ? 1 : 0);
    }

    public function isLastStep(): bool
    {
        return $this->getLivewire()->getIndex(true) === $this->getTotalSteps();
    }

    public function getTotalSteps(): int
    {
        return count($this->getSteps());
    }

    public function callAction(string $name)
    {
        if (method_exists($this, $name)) {
            return $this->{$name}();
        }
    }
}
