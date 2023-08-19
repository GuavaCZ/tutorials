<?php

namespace Guava\Tutorials\Steps;

use Filament\Forms\Components\Component;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Get;
use Filament\Support\Components\ViewComponent;
use Filament\Support\Concerns\HasColor;
use Guava\Tutorials\Concerns;
use Guava\Tutorials\Filament\TutorialAction;
use Guava\Tutorials\Selectors\FieldSelector;
use Guava\Tutorials\Selectors\Selector;
use Guava\Tutorials\Tutorial;

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

    protected string $evaluationIdentifier = 'step';

    protected string $viewIdentifier = 'step';

    protected Selector $selector;

    final public function __construct(string $name, Selector $selector)
    {
        $this->name($name);
        $this->selector = $selector;
    }

    public function configure(): static
    {
        return $this
            ->color('primary')
            ->hint(fn (Tutorial $tutorial, $livewire) => "{$livewire->getIndex(true)} / {$tutorial->getTotalSteps()}")
            ->actions(
                [
                    //                TutorialAction::make("{$this->getKey()}_continue")
                    TutorialAction::make(uniqid())
//                    ->icon('heroicon-o-user')
                        ->parentComponent($this)
//                    ->disabled()
//                    ->hidden()
                        ->disabled(fn ($get) => empty($get('name')))
                        ->color($this->getColor())
//                    ->label(fn($get) => $get('name'))
                        ->label(fn (Tutorial $tutorial) => $tutorial->isLastStep() ? 'Complete' : 'Next')
                        ->action('nextTutorialStep()'),
                ]
            )
        ;
    }

    //    public function getId(): string
    //    {
    //        return parent::getId() ?? $this->getStatePath();
    //    }

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

        $static = app(static::class, [
            'name' => $name,
            'selector' => $selector,
        ]);
        $static->configure();

        return $static;
    }

    public function getGetCallback(): callable
    {
        $component = new Component();
        /** @var HasForms $livewire */
        $livewire = $this->getLivewire();
        $form = $livewire->getForm('form');
        $component->container($form);

        return new Get($component);
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
            'get' => [$this->getGetCallback()],
            'tutorial', 'container' => [$this->getContainer()],
            //            'model' => [$this->getModel()],
            //            'record' => [$this->getRecord()],
            //            'set' => [$this->getSetCallback()],
            //            'state' => [$this->getState()],
            default => parent::resolveDefaultClosureDependencyForEvaluationByName($parameterName),
        };
    }
}
