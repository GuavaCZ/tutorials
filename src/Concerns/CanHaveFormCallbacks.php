<?php

namespace Guava\Tutorials\Concerns;

use Filament\Forms\Components\Component;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Get;

trait CanHaveFormCallbacks
{
    protected string $formName = 'form';

    public function formName(string $formName): static
    {
        $this->formName = $formName;

        return $this;
    }

    public function getFormName(): string
    {
        return $this->evaluate($this->formName);
    }

    public function getGetCallback(): ?callable
    {
        $component = new Component();
        $livewire = $this->getLivewire();

        if (! ($livewire instanceof HasForms)) {
            return null;
        }

        $form = $livewire->getForm($this->getFormName());
        $component->container($form);

        return new Get($component);
    }
}
