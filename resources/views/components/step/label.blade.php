@props([
    'label' => null
])
@if($label)
    <span>{{ $label }}</span>
@endif
