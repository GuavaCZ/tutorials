<?php

namespace Guava\Tutorials\Concerns;

use Guava\Tutorials\ComponentContainer;
use Guava\Tutorials\Contracts\HasTutorials;

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
