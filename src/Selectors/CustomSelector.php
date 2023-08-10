<?php

namespace Guava\FilamentTutorials\Selectors;

use Illuminate\Support\Arr;

class CustomSelector extends Selector
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

    public function toLivewire()
    {
        return [
            'selector' => $this->selector,
        ];
    }

    public static function fromLivewire($value)
    {
        $selector = Arr::get($value, 'selector');

        return static::make($selector);
    }
}
