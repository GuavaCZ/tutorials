<div>
    <div
            x-ignore
            ax-load
            ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('tutorial', 'guava/filament-tutorials') }}"

            x-data="tutorialComponent({
                tutorial: $wire.$entangle('tutorial'),
            })"
            @class([
                'hidden',
                'bg-black/80 fixed top-0 left-0 z-50 w-screen h-screen [clip-path:url(#myClip)]',
                'dark:bg-gray-800/80'
            ])
    >
{{--    {{ $this->getContinueAction() }}--}}
{{--        <span x-text="$wire.tutorial.test"></span>--}}

        @foreach($tutorial->getSteps() as $step)
            <livewire:filament-tutorials::step-container
                    :step="$step"
            />
        @endforeach
    </div>
</div>