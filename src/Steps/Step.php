<?php

namespace Guava\Tutorials\Steps;

use Filament\Support\Components\ViewComponent;
use Filament\Support\Concerns\HasColor;
use Guava\Tutorials\Concerns;
use Guava\Tutorials\Selectors\FieldSelector;
use Guava\Tutorials\Selectors\Selector;
use Guava\Tutorials\Tutorial;
use Illuminate\Database\Eloquent\Model;

class Step extends ViewComponent
{
    use Concerns\BelongsToContainer;
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
    use Concerns\CanPassThrough;
    use Concerns\CanInterceptClick;
    use HasColor;

    protected string $view = 'tutorials::step';

    protected string $evaluationIdentifier = 'step';

    protected string $viewIdentifier = 'step';

    protected Selector $selector;

    final public function __construct(string $name, Selector $selector)
    {
        $this->name($name);
        $this->selector = $selector;

        $this->configure();
    }

    public function configure(): static
    {
        return $this
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
            'component' => [$this->getFormComponent()],
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
