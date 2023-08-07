<?php

namespace Guava\FilamentTutorials\Tutorial;

class Step
{
    protected string $target;

    public function __construct(string $target)
    {
        $this->target = $target;
    }

    public function target(string $target): static
    {
        $this->target = $target;

        return $this;
    }

    public function getTarget(): string
    {
        return $this->target;
    }

    public static function make(string $target): static
    {
        return new static($target);
    }
}
