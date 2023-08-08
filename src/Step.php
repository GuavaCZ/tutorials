<?php

namespace Guava\FilamentTutorials;

use Filament\Support\Components\ViewComponent;
use Illuminate\Support\Arr;
use Livewire\Wireable;

class Step extends ViewComponent implements Wireable
{
    use Concerns\BelongsToContainer;

    //    use Concerns\BelongsToModel;
    //    use Concerns\CanBeConcealed;
    //    use Concerns\CanBeDisabled;
    use Concerns\CanBeHidden;

    //    use Concerns\CanSpanColumns;
    //    use Concerns\Cloneable;
    //    use Concerns\HasActions;
    //    use Concerns\HasChildComponents;
    //    use Concerns\HasFieldWrapper;
    //    use Concerns\HasId;
    //    use Concerns\HasInlineLabel;
    use Concerns\HasKey;

    //    use Concerns\HasLabel;
    //    use Concerns\HasMaxWidth;
    //    use Concerns\HasMeta;
    //    use Concerns\HasState;
    //    use Concerns\ListensToEvents;
    //    use HasColumns;
    //    use HasExtraAttributes;
    //    use HasStateBindingModifiers;
    use Concerns\HasName;

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
}
