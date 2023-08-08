<?php

namespace Guava\FilamentTutorials\Concerns;

use Guava\FilamentTutorials\Contracts\HasTutorials;
use Livewire\Exceptions\PropertyNotFoundException;

trait ResolvesDynamicLivewireProperties
{
    public function __get($property): mixed
    {
        try {
            return parent::__get($property);
        } catch (PropertyNotFoundException $exception) {
        }

        if (
            $this instanceof HasTutorials &&
            $tutorial = $this->getTutorial($property)
        ) {
            return $tutorial;
        }

        throw $exception;
    }
}
