@props([
    'actions' => [],
    'color' => null,
])
@if(!empty($actions))
    <div class="ml-auto flex flex-row flex-wrap gap-2">
        @foreach($actions as $action)
            <div @class([
                    '[&_button]:!bg-custom-400',
                    match ($color) {
                        'gray' => '[&_button]:!:bg-gray-400 [&_button]:!text-gray-950',
                        'white' => '[&_button]:!bg-white [&_button]:text-gray-950',
                        default => '[&_button]:!bg-custom-400',
                    },
                    'hidden' => $action->isHidden(),
            ])>
                {{ $action
                    ->when(
                        $action->getColor() === null,
                        fn ($action) => $action->color($color)
                    )
                }}
            </div>
        @endforeach
    </div>
@endif
