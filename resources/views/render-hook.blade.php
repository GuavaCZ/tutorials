@props([
    'livewire' => null,
])

@if($livewire)
    @foreach($livewire->getCachedTutorials() as $tutorial)
        {{ $tutorial }}
    @endforeach
@endif