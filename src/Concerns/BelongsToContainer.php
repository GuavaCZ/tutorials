<?php

namespace Guava\FilamentTutorials\Concerns;

use Guava\FilamentTutorials\ComponentContainer;
use Guava\FilamentTutorials\Contracts\HasTutorials;

trait BelongsToContainer
{
    protected ComponentContainer $container;

    public function container(ComponentContainer $container): static
    {
        $this->container = $container;

        return $this;
    }

    public function getContainer(): ComponentContainer
    {
        return $this->container;
    }

    public function getLivewire(): HasTutorials
    {
        return $this->getContainer()->getLivewire();
    }
}
