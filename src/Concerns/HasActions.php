<?php

namespace Guava\Tutorials\Concerns;

use Closure;
use Guava\Tutorials\Filament\Actions\CompleteTutorialAction;
use Guava\Tutorials\Filament\Actions\NextStepAction;
use Guava\Tutorials\Filament\Actions\PreviousStepAction;
use Guava\Tutorials\Filament\Actions\SkipTutorialAction;
use Guava\Tutorials\Filament\TutorialAction;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

trait HasActions
{
    /**
     * @var array<TutorialAction>|Closure|null
     */
    protected null | array | Closure $actions = null;

    protected ?TutorialAction $previousStepAction = null;

    protected ?TutorialAction $nextStepAction = null;

    protected ?TutorialAction $skipTutorialAction = null;

    protected ?TutorialAction $completeTutorialAction = null;

    /**
     * @var array<TutorialAction>|Closure
     */
    public function actions(array | Closure $actions): static
    {
        $this->actions = $actions;

        return $this;
    }

    public function previousStepAction(TutorialAction | Closure | null $action): static
    {
        $this->previousStepAction = $action;

        return $this;
    }

    public function getPreviousAction(): ?TutorialAction
    {
        return $this->evaluate($this->previousStepAction, [
            'action' => PreviousStepAction::make(),
        ]);
    }

    public function nextStepAction(TutorialAction | Closure | null $action): static
    {
        $this->nextStepAction = $action;

        return $this;
    }

    public function getNextStepAction(): ?TutorialAction
    {
        return $this->evaluate($this->nextStepAction, [
            'action' => NextStepAction::make(),
        ]);
    }

    public function skipTutorialAction(TutorialAction | Closure | null $action): static
    {
        $this->skipTutorialAction = $action;

        return $this;
    }

    public function getSkipTutorialAction(): ?TutorialAction
    {
        return $this->evaluate($this->skipTutorialAction, [
            'action' => SkipTutorialAction::make(),
        ]);
    }

    public function completeTutorialAction(TutorialAction | Closure | null $action): static
    {
        $this->completeTutorialAction = $action;

        return $this;
    }

    public function getCompleteTutorialAction(): ?TutorialAction
    {
        return $this->evaluate($this->completeTutorialAction, [
            'action' => CompleteTutorialAction::make(),
        ]);
    }

    /**
     * @return array<TutorialAction>
     */
    public function getActions(): array
    {
        return collect($this->evaluate($this->actions ?? $this->getDefaultActions()))
            ->map(fn (TutorialAction $action) => $action->parentComponent($this))
            ->toArray()
        ;
    }

    public function hasActions(): bool
    {
        return $this->actions !== null;
    }

    protected function getDefaultActions(): array
    {
        $actions = Arr::whereNotNull([
            $this->getSkipTutorialAction(),
            $this->getPreviousAction(),
            $this->getNextStepAction(),
            $this->getCompleteTutorialAction(),
        ]);
        Log::info('Default Actions for step '.$this->getName().' : ', [
            'actions' => $actions,
        ]);

        return $actions;
    }
}
