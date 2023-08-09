<div>
    @if ($this->activeStepKey)
        <div
                x-data
                {{--        x-cloak--}}
                {{--        x-show="true"--}}
                @class([
                    'fixed top-0 left-0 w-screen h-screen z-40',
                    'bg-black/80',
                    '[clip-path:url(#stepClipPath)]',
                    'dark:bg-gray-800/80',
                ])
        >
            <div
                    wire:key="{{$this->activeStepKey}}">
                {{ $this->getStep($this->activeStepKey) }}
            </div>
        </div>{{--<div>--}}
    @endif
</div>
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