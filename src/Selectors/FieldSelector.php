<?php

namespace Guava\Tutorials\Selectors;

use Illuminate\Support\Arr;

class FieldSelector extends Selector
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
        return "#data\\.{$this->selector}";
    }

    public function toLivewire(): array
    {
        return [
            'selector' => $this->selector,
            'class' => static::class,
        ];
    }

    public static function fromLivewire($value): static
    {
//        $selector = Arr::get($value, 'selector');
        $class = Arr::pull($value, 'class');

        return app($class, $value);
    }
}
