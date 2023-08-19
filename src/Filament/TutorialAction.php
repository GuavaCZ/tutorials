<?php

namespace Guava\Tutorials\Filament;

use Closure;
use Filament\Actions\StaticAction;
use Guava\Tutorials\Concerns\BelongsToParentComponent;

class TutorialAction extends StaticAction
{
    use BelongsToParentComponent;

    public function configure(): static
    {
        $this->view = static::BUTTON_VIEW;

        return $this;
    }

    public function action(Closure | string | null $action): static
    {
        if (is_callable($action)) {
            $class = $this::class;
            throw new \InvalidArgumentException("TutorialAction does currently not support closures. Please add a function to {$class} and pass the function's name as a string instead.");
        }

        return parent::action($action);
    }

    public function getExtraAttributes(): array
    {
        return [
            ...$this->extraAttributes,
            'wire:loading.attr' => 'disabled-fix',
        ];
    }

    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        //        dd('livewire', $this->getLivewire());
        return match ($parameterName) {
            'livewire' => [$this->getLivewire()],
            'tutorial' => [$this->getParentComponent()->getContainer()],
            'step' => [$this->getParentComponent()],
            'get' => [$this->getParentComponent()->getGetCallback()],
            //            'model' => [$this->getModel()],
            //            'record' => [$this->getRecord()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }
}
