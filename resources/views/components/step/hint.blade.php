@props([
    'hint' => null
])

@if($hint)
    <span class="ml-auto">{{ $hint }}</span>
@endif
