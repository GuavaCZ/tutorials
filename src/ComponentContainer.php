<?php

namespace Guava\Tutorials;

use Filament\Support\Components\ViewComponent;
use Filament\Support\Concerns\HasColor;
use Guava\Tutorials\Contracts\HasTutorials;
use Guava\Tutorials\Filament\Actions\CompleteTutorialAction;
use Guava\Tutorials\Filament\Actions\NextStepAction;
use Guava\Tutorials\Filament\Actions\PreviousStepAction;
use Guava\Tutorials\Filament\Actions\SkipTutorialAction;
use Illuminate\Database\Eloquent\Model;

class ComponentContainer extends ViewComponent
{
    use Concerns\BelongsToLivewire;
    use Concerns\CanHaveFormCallbacks;
    use Concerns\HasActions;
    use Concerns\HasLabel;
    use Concerns\HasLifecycleEvents;
    use Concerns\HasName;
    use Concerns\HasSteps;
    use HasColor;

    protected string $view = 'tutorials::component-container';

    protected string $evaluationIdentifier = 'container';

    protected string $viewIdentifier = 'container';

    final public function __construct(HasTutorials $livewire)
    {
        $this->livewire($livewire);

        $this->configure();
    }

    public function configure(): static
    {
        return $this
            ->color('primary')
            ->previousStepAction(PreviousStepAction::make())
            ->nextStepAction(NextStepAction::make())
            ->skipTutorialAction(SkipTutorialAction::make())
            ->completeTutorialAction(CompleteTutorialAction::make())
        ;
    }

    public static function make(HasTutorials $livewire): static
    {
        return app(static::class, [
            'livewire' => $livewire,
        ]);
    }

    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'livewire' => [$this->getLivewire()],
            'tutorial', 'container' => [$this],
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
