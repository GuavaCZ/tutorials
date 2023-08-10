<?php

namespace Guava\FilamentTutorials\Selectors;

use Illuminate\Support\Arr;
use Livewire\Wireable;

class Selector implements Wireable
{

    protected string $selector;

    public function __construct(string $selector)
    {
        $this->selector = $selector;
    }

    public function getSelector(): string
    {
        return $this->selector;
    }

    public static function make(string $selector)
    {
        return app(static::class, [
            'selector' => $selector,
        ]);
    }

    public function __toString(): string
    {
        return $this->selector;
    }

    public function toLivewire(): array
    {
        return [
            'selector' => $this->selector,
        ];
    }

    public static function fromLivewire($value): static
    {
        $selector = Arr::get($value, 'selector');

        return static::make($selector);
    }

}
