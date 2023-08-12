<?php

namespace Guava\Tutorials\Concerns;

trait HasState
{
    protected ?string $statePath = null;

    protected string $cachedAbsoluteStatePath;

    public function state($key, mixed $state): static
    {
        $livewire = $this->getLivewire();

        data_set($livewire, $this->getStatePath($key), $this->evaluate($state));

//        dump($livewire, $this->getStatePath($key));

        return $this;
    }

    public function getState(string $key): mixed
    {
        $state = data_get($this->getLivewire(), $this->getStatePath($key));

        if (is_array($state)) {
            return $state;
        }

        if (blank($state)) {
            return null;
        }

        return $state;
    }

    public function getStatePath(string $key): string
    {

        return implode('.', [
            'mountedTutorialData',
            $key
        ]);

//        if (isset($this->cachedSta)) {
//            return $this->cachedAbsoluteStatePath;
//        }

        $pathComponents = [];

//        $pathComponents[] = 'tutorialData';
        //        if ($containerStatePath = $this->getContainer()->getStatePath()) {
        //            $pathComponents[] = $containerStatePath;
        //        }
        //
        if ($this->hasStatePath()) {
            $pathComponents[] = $this->statePath;
        }

        $pathComponents[] = $key;

        return implode('.', $pathComponents);

//        return $this->cachedAbsoluteStatePath = implode('.', $pathComponents);
    }

    public function hasStatePath(): bool
    {
        return filled($this->statePath);
    }
}
