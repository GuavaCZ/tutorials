<?php

namespace Guava\Tutorials\Steps;

use Filament\Support\Components\ViewComponent;
use Filament\Support\Concerns\HasColor;
use Guava\Tutorials\Concerns;
use Guava\Tutorials\Filament\TutorialAction;
use Guava\Tutorials\Selectors\FieldSelector;
use Guava\Tutorials\Selectors\Selector;
use Guava\Tutorials\Tutorial;
use Illuminate\Database\Eloquent\Model;

class Step extends ViewComponent
{
    use Concerns\BelongsToContainer;

    //    use Concerns\BelongsToModel;
    //    use Concerns\CanBeConcealed;
    //    use Concerns\CanBeDisabled;
    use Concerns\CanBeHidden;
    use Concerns\HasKey;
    use Concerns\HasName;
    use Concerns\HasLabel;
    use Concerns\HasHint;
    use Concerns\HasDescription;
    use Concerns\CanBeInteracted;
    use Concerns\RequiresAction;
    use Concerns\HasActions;
    use Concerns\CanHaveFormCallbacks;
    use HasColor;

    protected string $view = 'tutorials::step';

    protected string $evaluationIdentifier = 'step';

    protected string $viewIdentifier = 'step';

    protected Selector $selector;

    protected ?TutorialAction $nextStepAction = null;

    final public function __construct(string $name, Selector $selector)
    {
        $this->name($name);
        $this->selector = $selector;

        $this->configure();
    }

    public function configure(): static
    {
        return $this
            ->color('primary')
            ->hint(
                fn (Tutorial $tutorial, $livewire) => trans_choice(
                    'tutorials::step.hint',
                    $tutorial->getTotalSteps(),
                    [
                        'current' => $livewire->getIndex(true),
                        'total' => $tutorial->getTotalSteps(),
                    ]
                )
            )
            ->actions(
                [
                    $this->getNextStepAction(),
                ]
            )
        ;
    }

    public function nextStepAction(TutorialAction | \Closure $action): static
    {
        $this->nextStepAction = $action;

        return $this;
    }

    public function getNextStepAction(): TutorialAction
    {
        return $this->evaluate($this->nextStepAction, [
            'action' => $this->getDefaultNextStepAction(),
        ]) ?? $this->getDefaultNextStepAction();
    }

    protected function getDefaultNextStepAction(): TutorialAction
    {
        return TutorialAction::make(uniqid())
            ->icon(fn (Tutorial $tutorial) => $tutorial->isLastStep()
                ? 'heroicon-o-check-circle'
                : 'heroicon-o-arrow-right-circle')
            ->parentComponent($this)
//            ->disabled(fn (callable $get, Step $step) => ! $get($step->getName()) && empty($get($step->getName())))
            ->color($this->getColor())
            ->label(fn (Tutorial $tutorial) => $tutorial->isLastStep()
                ? __('tutorials::step.complete') : __('tutorials::step.next'))
            ->action('nextTutorialStep()')
        ;
    }

    public function getKey(): string
    {
        return $this->getName();
    }

    public function selector(Selector $selector): static
    {
        $this->selector = $selector;

        return $this;
    }

    public function getSelector()
    {
        return $this->evaluate($this->selector);
    }

    public static function make(string | Selector $selector): static
    {
        $name = $selector instanceof Selector ? uniqid() : $selector;
        $selector = $selector instanceof Selector ? $selector : FieldSelector::make($name);

        return app(static::class, [
            'name' => $name,
            'selector' => $selector,
        ]);
    }

    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'livewire' => [$this->getLivewire()],
            'step' => [$this],
            'tutorial', 'container' => [$this->getContainer()],
            'model' => [$this->getLivewire()->getModel()],
            'record' => [$this->getLivewire()->getRecord()],
            'get' => [$this->getGetCallback()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    {
        $record = $this->getLivewire()->getRecord();

        if (! $record) {
            return parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType);
        }

        return match ($parameterType) {
            Model::class, $record::class => [$record],
            default => parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType),
        };
    }
}
