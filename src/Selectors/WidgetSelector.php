<?php

namespace Guava\Tutorials\Selectors;

class WidgetSelector extends Selector
{
    public function __construct(string $selector)
    {
        parent::__construct($selector);
    }



    public function __toString(): string
    {
        return ".fi-wi > div:nth-child({$this->selector})";
    }

    public static function make(string $selector)
    {
        return app(static::class, [
            'selector' => $selector,
        ]);
    }
}
