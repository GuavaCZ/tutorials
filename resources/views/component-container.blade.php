@php
    $interactive = true;
    $mountedTutorial = $this->getMountedTutorial();
@endphp

@if($mountedTutorial === $container)
    <div>
        <div
                x-ignore
                ax-load
                ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('tutorial', 'guava/tutorials') }}"

                x-data="tutorialComponent()"

                @class([
                    'absolute top-0 left-0 w-screen h-screen z-40 bg-fixed',
                    'bg-black/80',
                    '[clip-path:url(#stepClipPath)]',
                    'dark:bg-gray-800/80',
                ])

                @style([
                    \Filament\Support\get_color_css_variables($getColor(), shades: [400, 500, 600]) => $getColor() !== 'gray',
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