<?php

namespace Guava\FilamentTutorials\Tutorial;

use Filament\Support\Concerns\EvaluatesClosures;
use Guava\FilamentTutorials\Concerns\BelongsToTutorial;
use Guava\FilamentTutorials\Concerns\HasDescription;
use Guava\FilamentTutorials\Concerns\HasHint;
use Guava\FilamentTutorials\Concerns\HasLabel;
use Guava\FilamentTutorials\Concerns\HasLivewire;
use Livewire\Wireable;

class Step implements Wireable
{
    use HasLabel;
    use HasDescription;
    use HasHint;
    use BelongsToTutorial;
    use HasLivewire;
    use EvaluatesClosures;

    public int $index = 0;

    public function index(int $index): static
    {
        $this->index = $index;

        return $this;
    }

    public function getIndex(): int
    {
        return $this->index;
    }

    protected string $target;

    public function __construct(string $target)
    {
        $this->target = $target;
        $this->livewire = request()->route()->controller;

        $this->setUp();
    }

    protected function setUp(): void
    {
        $this->hint(fn ($index, $steps) => "step {$index} of {$steps}");
    }

    protected function getSteps(): int
    {
        return count($this->getTutorial()->getSteps());
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

    public function toLivewire(): array
    {
        return [
            'target' => $this->getTarget(),
            'index' => $this->getIndex(),
        ];
    }

    public static function fromLivewire($value): static
    {
        $target = $value['target'];
        $index = $value['index'];

        return (new static($target))->index($index);
    }
}
