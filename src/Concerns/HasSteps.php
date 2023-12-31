<?php

namespace Guava\Tutorials\Concerns;

use Closure;
use Guava\Tutorials\Steps\Step;

trait HasSteps
{
    /**
     * @var array<Step> | Closure
     */
    protected array | Closure $steps = [];

    /**
     * @param  array<Step> | Closure  $steps
     */
    public function steps(array | Closure $steps): static
    {
        $this->steps = $steps;

        return $this;
    }

    /**
     * @param  array<Step> | Closure  $steps
     */
    public function schema(array | Closure $steps): static
    {
        $this->steps($steps);

        return $this;
    }

    public function getStep(string | Closure $findStepUsing, bool $withHidden = false): ?Step
    {
        if (is_string($findStepUsing)) {
            $findStepUsing = static function (Step $step) use ($findStepUsing): bool {
                $key = $step->getKey();

                if ($key === null) {
                    return false;
                }

                return $key === $findStepUsing;
            };
        }

        return collect($this->getFlatSteps($withHidden))->first($findStepUsing);
    }

    /**
     * @return array<Step>
     */
    public function getFlatSteps(bool $withHidden = false): array
    {
        return array_reduce(
            $this->getSteps($withHidden),
            function (array $carry, Step $step): array {
                $carry[] = $step;

                return $carry;
            },
            initial: [],
        );
    }

    /**
     * @return array<Step>
     */
    public function getSteps(bool $withHidden = false): array
    {
        $steps = array_map(function (Step $step): Step {
            $step
                ->container($this)
                ->when(
                    ! $step->hasActions(),
                    fn () => $step->actions($this->getActions())
                )
            ;

            return $step;
        }, $this->evaluate($this->steps));

        if ($withHidden) {
            return $steps;
        }

        return array_filter(
            $steps,
            fn (Step $step) => $step->isVisible(),
        );
    }
}
