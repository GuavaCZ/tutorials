<?php

namespace Guava\FilamentTutorials;

use Filament\Actions\Action;
use Filament\Support\Components\ViewComponent;
use Filament\Support\Concerns\HasColor;
use Illuminate\Support\Arr;
use Livewire\Wireable;

class Step extends ViewComponent implements Wireable
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
    use HasColor;

    //    use Concerns\CanSpanColumns;
    //    use Concerns\Cloneable;
    //    use Concerns\HasActions;
    //    use Concerns\HasChildComponents;
    //    use Concerns\HasFieldWrapper;
    //    use Concerns\HasId;
    //    use Concerns\HasInlineLabel;

    //    use Concerns\HasLabel;
    //    use Concerns\HasMaxWidth;
    //    use Concerns\HasMeta;
    //    use Concerns\HasState;
    //    use Concerns\ListensToEvents;
    //    use HasColumns;
    //    use HasExtraAttributes;
    //    use HasStateBindingModifiers;

    protected string $view = 'filament-tutorials::step';

    protected string $evaluationIdentifier = 'component';

    /**
     * @return array<mixed>
     */
    protected function resolveDefaultClosureDependencyForEvaluationByName(string $parameterName): array
    {
        return match ($parameterName) {
            //            'context', 'operation' => [$this->getContainer()->getOperation()],
            //            'get' => [$this->getGetCallback()],
            'livewire' => [$this->getLivewire()],
            'step' => [$this],
            //            'model' => [$this->getModel()],
            //            'record' => [$this->getRecord()],
            //            'set' => [$this->getSetCallback()],
            //            'state' => [$this->getState()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }

    final public function __construct(string $name)
    {
        $this->name($name);
    }

    public static function make(string $name): static
    {
        $static = app(static::class, ['name' => $name]);
        $static->configure();

        return $static;
    }

    //    public function getId(): string
    //    {
    //        return parent::getId() ?? $this->getStatePath();
    //    }

    public function getKey(): string
    {
        return $this->getName();
    }

    public function toLivewire()
    {
        return [
            'name' => $this->getName(),
            'key' => $this->getKey(),
        ];
    }

    public static function fromLivewire($value)
    {
        $name = Arr::get($value, 'name');
        $key = Arr::get($value, 'key');

        return static::make($name)
            ->name($name)
            ->key($key)
        ;
    }

    public function getContinueAction()
    {

        //        <button type="button" wire:click="setActiveStep('email')" class="pointer-events-auto">Test</button>
        return Action::make('continue')
            ->color($this->getColor())
            ->label('Continue')
            ->action('nextStep()')
        ;
    }
}
