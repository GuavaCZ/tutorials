<?php

namespace Guava\Tutorials;

use Filament\Forms\Components\Component;
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

    protected function getGetCallback(): callable
    {
        $component = new Component();
        /** @var HasForms $livewire */
        $livewire = $this->getLivewire();
        $form = $livewire->getForm('form');
        $component->container($form);

        return new Get($component);
    }

    /**
     * @param string $parameterName
     * @return array
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            'livewire' => [$this->getLivewire()],
            'get' => [$this->getGetCallback()],
            'model' => [$this->getLivewire()->getModel()],
            'record' => [$this->getLivewire()->getRecord()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    //    /**
    //     * @return array<mixed>
    //     */
    //    protected function resolveDefaultClosureDependencyForEvaluationByType(string $parameterType): array
    //    {
    //        $record = $this->getRecord();
    //
    //        if (! $record) {
    //            return parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType);
    //        }
    //
    //        return match ($parameterType) {
    //            Model::class, $record::class => [$record],
    //            default => parent::resolveDefaultClosureDependencyForEvaluationByType($parameterType),
    //        };
    //    }

}
