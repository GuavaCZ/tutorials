<?php

namespace Guava\Tutorials\Concerns;

use Filament\Forms\Components\Component;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Get;
use Guava\Tutorials\Selectors\FieldSelector;

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

    public function getFormComponent(): ?Component
    {
        $livewire = $this->getLivewire();

        if (! ($livewire instanceof HasForms)) {
            return null;
        }

        if (! ($this->getSelector() instanceof FieldSelector)) {
            return null;
        }

        $key = $this->getName();

        $form = $livewire->getForm($this->getFormName());

        return collect($form->getFlatComponents())->first(
            fn (Component $component) => in_array($component->getStatePath(), [
                $key,
                "data.$key",
                "{$this->getFormName()}.$key",
            ]),
        );
    }
}
