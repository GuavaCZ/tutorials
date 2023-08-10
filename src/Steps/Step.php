<?php

namespace Guava\FilamentTutorials\Steps;

use Filament\Actions\Action;
use Filament\Support\Components\ViewComponent;
use Filament\Support\Concerns\HasColor;
use Guava\FilamentTutorials\Concerns;
use Guava\FilamentTutorials\Selectors\FieldSelector;
use Guava\FilamentTutorials\Selectors\Selector;
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
    use Concerns\CanBeInteracted;
    use Concerns\RequiresAction;
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

    protected string $view = 'tutorials::step';

    protected string $evaluationIdentifier = 'component';

    protected Selector $selector;

    final public function __construct(string $name, Selector $selector)
    {
        $this->name($name);
        $this->selector = $selector;
    }

    public function configure(): static
    {
        $this->color = 'primary';

        return $this;
    }

    //    public function getId(): string
    //    {
    //        return parent::getId() ?? $this->getStatePath();
    //    }

    public function getKey(): string
    {
        return $this->getName();
    }

    protected bool $hiddenAction = false;

    public function hiddenAction(bool $condition = true): static
    {
        $this->hiddenAction = $condition;

        return $this;
    }

    public function isHiddenAction(): bool
    {
        return $this->evaluate($this->hiddenAction);
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

    public function toLivewire()
    {
        return [
            'name' => $this->getName(),
            'key' => $this->getKey(),
            'color' => $this->getColor(),
            'isInteractive' => $this->isInteractive(),
            'selector' => $this->getSelector(),
            'label' => $this->getLabel(),
            'hint' => $this->getHint(),
            'description' => $this->getDescription(),
            'hiddenAction' => $this->isHiddenAction(),
            'requiresAction' => $this->isActionRequired(),
        ];
    }

    public static function fromLivewire($value)
    {
        $name = Arr::get($value, 'name');
        $key = Arr::get($value, 'key');
        $color = Arr::get($value, 'color');
        $isInteractive = Arr::get($value, 'isInteractive');
        $selector = Arr::get($value, 'selector');
        $label = Arr::get($value, 'label');
        $hint = Arr::get($value, 'hint');
        $description = Arr::get($value, 'description');
        $hiddenAction = Arr::get($value, 'hiddenAction');
        $requiresAction = Arr::get($value, 'requiresAction');

        return static::make($name)
            ->name($name)
            ->key($key)
            ->label($label)
            ->hint($hint)
            ->description($description)
            ->color($color)
            ->interactive($isInteractive)
            ->selector($selector)
            ->hiddenAction($hiddenAction)
            ->requiresAction($requiresAction)
        ;
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

        $static = app(static::class, [
            'name' => $name,
            'selector' => $selector,
        ]);
        $static->configure();

        return $static;
    }

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
}
