<?php

namespace Guava\Tutorials\Filament;

use Closure;
use Filament\Actions\StaticAction;
use Guava\Tutorials\Concerns\BelongsToParentComponent;
use Guava\Tutorials\Steps\Step;
use Illuminate\Database\Eloquent\Model;

/**
 * @method Step getParentComponent()
 */
class TutorialAction extends StaticAction
{
    use BelongsToParentComponent;

    protected function setUp(): void
    {
        parent::setUp();

        $this->view = static::BUTTON_VIEW;
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
        return match ($parameterName) {
            'livewire' => [$this->getParentComponent()->getLivewire()],
            'step' => [$this->getParentComponent()],
            'tutorial' => [$this->getParentComponent()->getContainer()],
            'get' => [$this->getParentComponent()->getGetCallback()],
            'component' => [$this->getParentComponent()->getFormComponent()],
            'model' => [$this->getParentComponent()->getLivewire()->getModel()],
            'record' => [$this->getParentComponent()->getLivewire()->getRecord()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    {
        $record = $this->getParentComponent()->getLivewire()->getRecord();

        if (! $record) {
            return parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType);
        }

        return match ($parameterType) {
            Model::class, $record::class => [$record],
            default => parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType),
        };
    }

    public static function getDefaultName(): ?string
    {
        return uniqid('tutorial-action-');
    }
}
