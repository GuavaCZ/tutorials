<?php

namespace Guava\FilamentTutorials\Tutorial;

class Tutorial
{
    protected string $id;

    protected array $steps;

    public function __construct(string $id)
    {
        $this->id = $id;
    }

    public function id(string $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function steps(array $steps): static
    {
        $this->steps = $steps;

        return $this;
    }

    public function getSteps(): array
    {
        return $this->steps;
    }

    public static function make(string $id): static
    {
        return new static($id);
    }
}
