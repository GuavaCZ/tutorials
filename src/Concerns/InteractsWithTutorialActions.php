<?php

namespace Guava\Tutorials\Concerns;

use Closure;
use Filament\Actions\Action;
use Filament\Support\Exceptions\Cancel;
use Filament\Support\Exceptions\Halt;
use Illuminate\Support\Arr;
use InvalidArgumentException;

use function Livewire\store;

trait InteractsWithTutorialActions
{
    /**
     * @var array<string> | null
     */
    public ?array $mountedTutorialActions = [];

    /**
     * @var array<string, array<string, mixed>> | null
     */
    public ?array $mountedTutorialActionsArguments = [];

    /**
     * @var array<string, array<string, mixed>> | null
     */
    public ?array $mountedTutorialActionsData = [];

    /**
     * @var array<string, Action>
     */
    protected array $cachedTutorialActions = [];

    public function cacheTutorialAction(Action $action): Action
    {
        $action->livewire($this);

        return $this->cachedTutorialActions[$action->getName()] = $action;
    }

    /**
     * @param  string | array<string>  $name
     */
    public function getTutorialAction(array | string $name): ?Action
    {
        if (is_string($name) && str($name)->contains('.')) {
            $name = explode('.', $name);
        }

        if (is_array($name)) {
            $name = array_shift($name);
        }

        if ($action = $this->cachedTutorialActions[$name] ?? null) {
            return $action;
        }

        if (
            (! str($name)->endsWith('Action')) &&
            method_exists($this, "{$name}Action")
        ) {
            $methodName = "{$name}Action";
        } elseif (method_exists($this, $name)) {
            $methodName = $name;
        } else {
            //            return null;
        }

        $action = Action::configureUsing(
            Closure::fromCallable([$this, 'configureAction']),
            fn () => $this->{$methodName}(),
        );

        dd($action);

        if (! $action instanceof Action) {
            throw new InvalidArgumentException('Actions must be an instance of '.Action::class.". The [{$methodName}] method on the Livewire component returned an instance of [".get_class($action).'].');
        }

        return $this->cacheTutorialAction($action);
    }

    public function getMountedTutorialAction(): ?Action
    {
        if (! count($this->mountedTutorialActions ?? [])) {
            return null;
        }

        return $this->getTutorialAction($this->mountedTutorialActions);
    }

    /**
     * @param  array<string, mixed>  $arguments
     */
    public function mountTutorialAction(string $name, array $arguments = []): mixed
    {
        $this->mountedTutorialActions[] = $name;
        $this->mountedTutorialActionsArguments[] = $arguments;
        $this->mountedTutorialActionsData[] = [];

        $action = $this->getMountedTutorialAction();

        if (! $action) {
            $this->unmountTutorialAction();

            return null;
        }

        if ($action->isDisabled()) {
            $this->unmountTutorialAction();

            return null;
        }

        $action->arguments($arguments);

        try {
        } catch (Halt $exception) {
            return null;
        } catch (Cancel $exception) {
            $this->unmountTutorialAction(shouldCancelParentActions: false);

            return null;
        }

        return $this->callMountedTutorialAction();
    }

    public function unmountTutorialAction(bool $shouldCancelParentActions = true): void
    {
        $action = $this->getMountedTutorialAction();

        if (! ($shouldCancelParentActions && $action)) {
            $this->popMountedTutorialAction();
        } elseif ($action->shouldCancelAllParentActions()) {
            $this->resetMountedTutorialActionProperties();
        } else {
            $parentActionToCancelTo = $action->getParentActionToCancelTo();

            while (true) {
                $recentlyClosedParentAction = $this->popMountedTutorialAction();

                if (
                    blank($parentActionToCancelTo) ||
                    ($recentlyClosedParentAction === $parentActionToCancelTo)
                ) {
                    break;
                }
            }
        }

        if (! count($this->mountedTutorialActions)) {
        }
    }

    protected function popMountedTutorialAction(): ?string
    {
        try {
            return array_pop($this->mountedTutorialActions);
        } finally {
            array_pop($this->mountedTutorialActionsArguments);
            array_pop($this->mountedTutorialActionsData);
        }
    }

    protected function resetMountedTutorialActionProperties(): void
    {
        $this->mountedTutorialActions = [];
        $this->mountedTutorialActionsArguments = [];
        $this->mountedTutorialActionsData = [];
    }

    /**
     * @param  array<string, mixed>  $arguments
     */
    public function callMountedTutorialAction(array $arguments = []): mixed
    {
        $action = $this->getMountedTutorialAction();

        if (! $action) {
            return null;
        }

        if ($action->isDisabled()) {
            return null;
        }

        $action->arguments([
            ...Arr::last($this->mountedTutorialActionsArguments),
            ...$arguments,
        ]);

        $result = null;

        $originallyMountedActions = $this->mountedTutorialActions;

        try {
            $action->callBefore();

            $result = $action->call([
                //                'form' => $form,
            ]);

            $result = $action->callAfter() ?? $result;

            $this->afterActionCalled();
        } catch (Halt $exception) {
            return null;
        } catch (Cancel $exception) {
        }

        $action->resetArguments();

        // If the action was replaced while it was being called,
        // we don't want to unmount it.
        if ($originallyMountedActions !== $this->mountedTutorialActions) {

            return null;
        }

        if (store($this)->has('redirect')) {
            return $result;
        }

        $this->unmountTutorialAction();

        return $result;
    }

    protected function afterActionCalled(): void
    {
    }
}
