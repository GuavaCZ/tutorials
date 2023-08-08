<?php

namespace Guava\FilamentTutorials\Tutorial;

use Guava\FilamentTutorials\Concerns\HasLivewire;
use Livewire\Wireable;

class Tutorial implements Wireable
{
    use HasLivewire;

    protected string $id;

    protected array $steps;

    public int $test = 1;

    public function __construct(string $id)
    {
        $this->id = $id;
        $this->livewire = request()->route()->controller;

        $this->setUp();
    }

    protected function setUp(): void
    {
        //
    }

    public function test($value = null): static
    {
        if ($value) {
            $this->test = $value;
        } else {
            $this->test++;
        }

        return $this;
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
        $this->steps = array_map(fn(Step $step) => $step->tutorial($this), $steps);
        $this->steps = collect($steps)
            ->map(fn(Step $step, int $index) => $step->tutorial($this)->index($index+1))
            ->toArray();

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

    public function toLivewire(): array
    {
        return [
            'id' => $this->getId(),
            'steps' => $this->getSteps(),
            'test' => $this->test,
        ];
    }

    public static function fromLivewire($value): static
    {
        $id = $value['id'];
        $steps = $value['steps'];
        $test = $value['test'];

        return (new static($id))
            ->test($test)
            ->steps($steps)
        ;
    }
}
