<?php

namespace Guava\Tutorials\Filament;

use Closure;
use Filament\Actions\StaticAction;
use Guava\Tutorials\Concerns\BelongsToParentComponent;
use Illuminate\Support\Js;

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

    //    public function getLivewireClickHandler(): ?string
    //    {
    //        if ($parent = parent::getLivewireClickHandler()) {
    //            return $parent;
    //        }

    //        $argumentsParameter = '';
    //
    //        if (count($arguments = $this->getArguments())) {
    //            $argumentsParameter .= ', ';
    //            $argumentsParameter .= Js::from($arguments);
    //        }
    //
    //        return "mountTutorialAction('{$this->getName()}'{$argumentsParameter})";
    //    }

    //    public function getLivewireClickHandler(): ?string
    //    {
    //        if (! $this->isLivewireClickHandlerEnabled()) {
    //            return null;
    //        }
    //
    //        if (is_string($this->action)) {
    //            return $this->action;
    //        }
    //
    //        $argumentsParameter = '';
    //
    //        if (count($arguments = $this->getArguments())) {
    //            $argumentsParameter .= ', ';
    //            $argumentsParameter .= Js::from($arguments);
    //        }
    //
    //        return "mountTutorialAction('{$this->getName()}'{$argumentsParameter})";
    //    }

    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        //        dd('livewire', $this->getLivewire());
        return match ($parameterName) {
            'livewire' => [$this->getLivewire()],
            'tutorial' => [$this->getParentComponent()->getContainer()],
            'step' => [$this->getParentComponent()],
            //            'model' => [$this->getModel()],
            //            'record' => [$this->getRecord()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }
}
