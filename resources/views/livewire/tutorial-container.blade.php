<div
        x-data
        x-cloak
        x-show="true"
        @class([
            'fixed top-0 left-0 w-screen h-screen z-30 pointer-events-none',
            'bg-black/80',
            'dark:bg-gray-800/80',
        ])
>
        <button type="button" wire:click="setActiveStep('name')" class="pointer-events-auto">Test</button>
        {{ $this->getActiveStep() }}
</div>{{--<div>--}}
{{--    <div--}}
{{--            x-ignore--}}
{{--            ax-load--}}
{{--            ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('tutorial', 'guava/filament-tutorials') }}"--}}

{{--            x-data="tutorialComponent({--}}
{{--                tutorial: $wire.$entangle('tutorial'),--}}
{{--            })"--}}
{{--            @class([--}}
{{--                'hidden',--}}
{{--                'bg-black/80 fixed top-0 left-0 z-50 w-screen h-screen [clip-path:url(#myClip)]',--}}
{{--                'dark:bg-gray-800/80'--}}
{{--            ])--}}
{{--    >--}}
{{--    {{ $this->getContinueAction() }}--}}
{{--        <span x-text="$wire.tutorial.test"></span>--}}

{{--        @foreach($tutorial->getSteps() as $step)--}}
{{--            <livewire:filament-tutorials::step-container--}}
{{--                    :step="$step"--}}
{{--            />--}}
{{--        @endforeach--}}
{{--    </div>--}}
{{--</div>--}}