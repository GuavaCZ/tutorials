@props([
    'hint' => null
])

@if($hint)
    <span>{{ $hint }}</span>
@endif
