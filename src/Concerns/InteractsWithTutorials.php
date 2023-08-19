<?php

namespace Guava\Tutorials\Concerns;

use Closure;
use Exception;
use Filament\Pages\Dashboard;
use Filament\Resources\Pages\CreateRecord;
use Filament\Resources\Pages\EditRecord;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Pages\ViewRecord;
use Guava\Tutorials\Tutorial;

trait InteractsWithTutorials
{
    use ResolvesDynamicLivewireProperties;
    use InteractsWithTutorialActions;
    use HandlesTutorialState;

    protected array $tutorialData = [];

    /**
     * @var array<string, Tutorial>
     */
    protected ?array $cachedTutorials = null;

    protected bool $hasCachedTutorials = false;

    protected bool $isCachingTutorials = false;

    //    protected bool $hasTutorialsModalRendered = false;

    protected function cacheTutorial(string $name, Tutorial | Closure | null $tutorial): ?Tutorial
    {
        $this->isCachingTutorials = true;

        $tutorial = value($tutorial);

        if ($tutorial) {
            $this->cachedTutorials[$name] = $tutorial;
        } else {
            unset($this->cachedTutorials[$name]);
        }

        $this->isCachingTutorials = false;

        return $tutorial;
    }

    /**
     * @return array<string, Tutorial>
     */
    protected function cacheTutorials(): array
    {
        $this->isCachingTutorials = true;

        $this->cachedTutorials = collect($this->getTutorials())
//            ->merge($this->getTraitTutorials())
            ->mapWithKeys(function (Tutorial | string | null $tutorial, string | int $tutorialName): array {
                if ($tutorial === null) {
                    return ['' => null];
                }

                if (is_string($tutorialName)) {
                    return [$tutorialName => $tutorial];
                }

                if (! method_exists($this, $tutorial)) {
                    $livewireClass = $this::class;

                    throw new Exception("Tutorial configuration method [{$tutorialName}()] is missing from Livewire component [{$livewireClass}].");
                }

                //                return [$tutorial => $this->{$tutorial}($this->makeTutorial())];
                return [$tutorial => $this->{$tutorial}($this->makeTutorial()->name($tutorial))];
            })
            ->forget('')
            ->all()
        ;

        $this->isCachingTutorials = false;

        $this->hasCachedTutorials = true;

        //        foreach ($this->mountedFormComponentActions as $actionNestingIndex => $actionName) {
        //            $this->cacheForm(
        //                "mountedFormComponentActionForm{$actionNestingIndex}",
        //                $this->getMountedFormComponentActionForm($actionNestingIndex),
        //            );
        //        }

        return $this->cachedTutorials;
    }

    protected function hasCachedTutorial(string $name): bool
    {
        return array_key_exists($name, $this->getCachedTutorials());
    }

    public function getTutorial(string $name): ?Tutorial
    {
        return $this->getCachedTutorials()[$name] ?? null;
    }

    /**
     * @return array<string, Tutorial>
     */
    public function getCachedTutorials(): array
    {
        if (! $this->hasCachedTutorials) {
            return $this->cacheTutorials();
        }

        return $this->cachedTutorials;
    }

    /**
     * @return array<int | string, string | Tutorial>
     */
    protected function getTutorials(): array
    {
        return [
            'tutorial',
        ];
    }

    public function tutorial(Tutorial $tutorial): Tutorial
    {
        return $tutorial;
    }

    protected function makeTutorial(): Tutorial
    {
        return Tutorial::make($this);
    }

    public function isCachingTutorials(): bool
    {
        return $this->isCachingTutorials;
    }

    public function bootInteractsWithTutorials(): void
    {
        static::$view = static::getView();
        $this->listeners = [
            ...$this->listeners,
            'mountTutorial',
        ];
    }

    public static function getView(): string
    {
        $page = new static();

        return match (true) {
            $page instanceof ListRecords => 'tutorials::filament.pages.list-records',
            $page instanceof CreateRecord => 'tutorials::filament.pages.create-record',
            $page instanceof EditRecord => 'tutorials::filament.pages.edit-record',
            $page instanceof ViewRecord => 'tutorials::filament.pages.view-record',
            $page instanceof Dashboard => 'tutorials::filament.pages.dashboard',
            default => static::$view,
        };
    }

    public array $mountedTutorialData = [
        'index' => 0,
    ];

    public ?string $mountedTutorial = null;

    public function getMountedTutorial(): ?Tutorial
    {
        if (! $this->mountedTutorial) {
            return null;
        }

        return $this->getTutorial($this->mountedTutorial);
    }

    public function mountTutorial(string $name = 'tutorial'): void
    {
        $this->mountedTutorial = $name;
        if ($this->mountedTutorial === 'advanced') {
        }
        $this->getMountedTutorial()->callAfterMount();
    }

    public function unmountTutorial(): void
    {
        $this->getMountedTutorial()->callBeforeUnmount();
        $this->mountedTutorial = null;
    }

    protected function getListeners()
    {
        return [
            'mountTutorial',
        ];
    }
}
