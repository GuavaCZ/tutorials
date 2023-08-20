@php
    $interactive = true;
    $mountedTutorial = $this->getMountedTutorial();
@endphp
@if($mountedTutorial === $container)
    <div>
        <div
{{--                id="something"--}}
                x-ignore
                ax-load
                ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('tutorial', 'guava/tutorials') }}"

                x-data="tutorialComponent({
                    index: 1,
                })"

                @class([
                    'absolute top-0 left-0 w-screen h-screen z-40 bg-fixed',
                    'bg-black/80',
                    '[clip-path:url(#stepClipPath)]',
                    'dark:bg-gray-800/80',
                ])

                x-on:click.prevent.stop
        >
            @foreach($getSteps() as $step)

                <div wire:key="tutorial-step-{{$step->getKey()}}-{{uniqid()}}">
                    @if($loop->index === $this->getIndex())
                        @if(! $step->isInteractive())
                            @php
                                $interactive = false;
                            @endphp
                        @endif
                        {{$step}}
                    @endif
                </div>
            @endforeach
        </div>

        @if(! $interactive)
            <div class="fixed top-0 left-0 w-screen h-screen z-30" wire:key="{{$step->getKey()}}-interactivity"
                 x-on:click.prevent.stop
            ></div>
        @endif
    </div>
@endif
{{--<div--}}
{{--        x-data--}}
{{--        x-cloak--}}
{{--        x-show="true"--}}
{{--        @class([--}}
{{--            'fixed top-0 left-0 w-screen h-screen z-30 pointer-events-none',--}}
{{--            'bg-black/80',--}}
{{--            'dark:bg-gray-800/80',--}}
{{--        ])--}}
{{-->--}}
{{--    <button type="button" wire:click="$setActiveStep('tutorial', 'name')" class="pointer-events-auto">Test</button>--}}
{{--    {{ $getActiveStep() }}--}}
{{--    @foreach ($getSteps(withHidden: true) as $step)--}}
{{--        @php--}}
{{--            /**--}}
{{--             * Instead of only rendering the hidden components, we should--}}
{{--             * render the `<div>` wrappers for all fields, regardless of--}}
{{--             * if they are hidden or not. This is to solve Livewire DOM--}}
{{--             * diffing issues.--}}
{{--             *--}}
{{--             * Additionally, any `<div>` elements that wrap hidden--}}
{{--             * components need to have `class="hidden"`, so that they--}}
{{--             * don't consume grid space.--}}
{{--             */--}}
{{--            $isHidden = $step->isHidden();--}}
{{--        @endphp--}}

{{--        @if (! $isHidden)--}}
{{--            {{ $step }}--}}
{{--        @endif--}}
{{--    @endforeach--}}
{{--</div>--}}