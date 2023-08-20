<?php

namespace Guava\Tutorials;

use Filament\Forms\Components\Component;
use Filament\Forms\Concerns\HasOperation;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Get;
use Filament\Support\Components\ViewComponent;
use Guava\Tutorials\Contracts\HasTutorials;
use Illuminate\Database\Eloquent\Model;

class ComponentContainer extends ViewComponent
{
    use Concerns\HasName;
    use Concerns\HasLabel;
    use Concerns\BelongsToLivewire;

    //    use Concerns\HasState;
    use Concerns\HasSteps;
    use Concerns\HasLifecycleEvents;
    use Concerns\CanBeCompleted;
    use Concerns\CanHaveFormCallbacks;
    use HasOperation;

    protected string $view = 'tutorials::component-container';

    protected string $evaluationIdentifier = 'container';

    protected string $viewIdentifier = 'container';

    final public function __construct(HasTutorials $livewire)
    {
        $this->livewire($livewire);
        //        $this->statePath = 'mountedTutorialData';
        //        $this->state('index', 0);
    }

    public static function make(HasTutorials $livewire): static
    {
        return app(static::class, ['livewire' => $livewire]);
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
