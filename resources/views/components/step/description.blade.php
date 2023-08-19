@props([
    '$description' => null
])

@if($description)
    <span>{{ $description }}</span>
@endif
