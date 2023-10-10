### Tutorials

Tutorials is a complete tool for creating tutorials, walkthroughs and onboarding experiences for your users. It is a
simple and easy to use library, which can be integrated into your project with just a few lines of code.

### Not ready for production!

The tutorials plugin is currently in alpha version and thus not production-ready. Use at your own risk.

#### Prerequisites

- Laravel 10+
- PHP 8.0+
- Filament 3
- Livewire 3

Filament is currently a prerequisite, but it can be also used outside of the Filament Panels anywhere in your frontend
in any livewire component.

# Documentation

Below is all the information you need to get started. We try to follow the Filament conventions as much as possible, so
a lot of these steps should be familiar to you already.

## Installation

```bash
composer require guava/tutorials
```

### Add plugin to your filament dashboard

```php
use Guava\Tutorials\TutorialsPlugin;

$panel->plugins([
    TutorialsPlugin::make(),
    //
])
```

### Add tutorials to your livewire component (or filament page)

To get started, you need to do the following:

1. Implement the `HasTutorials` interface and use the `InteractsWithTutorials` trait.
2. Implement the `tutorial()` function.
3. Configure your tutorial inside the `tutorial()` function.
4. Mount the tutorial in the `mount()` function using `mountTutorial()`.

Let's say we have a Project Resource that allows us to edit the `name` and `description` of the project. And when
creating a project, we want to guide the user through the process using a tutorial. This is how our final create page
class would look like:

```php
use Guava\Tutorials\Concerns\InteractsWithTutorials;
use Guava\Tutorials\Contracts\HasTutorials;
use Guava\Tutorials\Steps\Step;

class CreateProject extends CreateRecord implements HasTutorials
{
    use InteractsWithTutorials;
    
    public function mount(): void
    {
        parent::mount();
        
        $this->mountTutorial();
    }
    
    public function tutorial(Tutorial $tutorial) : Tutorial
    {
        return $tutorial->steps([
            Step::make('name'),
            Step::make('description'),
        ]);
    }
}
```

That's it! You just created your first tutorial.

Keep in mind that this tutorial will be mounted on each page load. It is up to you to define the logic of when to mount
the tutorial.

### Tutorials
A tutorial is a set of `Steps` that should guide the user through your livewire components (or filament pages).

### Tutorial Lifecycle
You can hook into different parts of a Tutorial`s lifecycle.

#### After mount
After a tutorial is mounted, you can call your own code:

```php
$tutorial->steps([
    //
])
->afterMount(
    fn() => // Your code here
)
```

#### After unmount
After a tutorial is unmounted, you can call your own code:

```php
$tutorial->steps([
    //
])
->afterUnmount(
    fn() => // Your code here
)
```

#### After Skipped
If you have skippable tutorials, you can call your own code after a tutorial was skipped:

```php
$tutorial->steps([
    //
])
->afterSkipped(
    fn() => // Your code here
)
```


## Steps
Each tutorial consists of `Steps`, where each step represents an action the user can make or a part they should draw their attention to. Such as `fill out a form field`, `click a button` or just `view a widget`.

A step is basically an overlay around your target (form field, action button, ...) with:
1. A label positioned in the top-left corner of the step overlay.
2. A hint positioned in the top-right corner of the step overlay. By default, hint shows the tutorial progress: current step and the total number of steps.
3. A description positioned in the bottom-left corner of the step.
4. And actions positioned in the bottom-right corner of the step.

Steps offer plenty of customization options, which we will try to describe below.

### Selector
Every step needs a selector which is used to target an element to render an overlay around.

When a `Step` is created, it accepts either an instance of `Selector` or a `string` selector as a parameter.

When a `string` selector is passed, by default a `FormSelector`/`FieldSelector` (both are the same) is used.

But you are not limited to only targeting form fields, you can also target other elements on the page, such as a `Widget` or a `Action` button.

#### Form Field Selector
This is the default selector used by a step.

```php
use Guava\Tutorials\Selectors\FormSelector;
use Guava\Tutorials\Selectors\FieldSelector;
use Guava\Tutorials\Selectors\ComponentSelector;

// All variants are the same
Step::make('username');
Step::make(FormSelector::make('username'));
Step::make(FieldSelector::make('username'));
Step::make(ComponentSelector::make('username'));
```
All variants are the same, use whichever you prefer.

#### (Generic) Selector
A generic selector can be used to target elements using a CSS selector, such as:

```php
use \Guava\Tutorials\Selectors\Selector;

Step::make('div');
Step::make('#my-id');
Step::make('.my-class');
Step::make('[data-attribute]');
```

### Customizing label
By default the label is hidden. Here's how to set a label:

```php
Step::make('username')
    ->label('Enter a username');
```

You can also conditionally hide the label using:

```php
Step::make('username')
    ->hiddenLabel(true); // or a closure
```

### Customizing description
By default the description is hidden. Here's how to set a description:

```php
Step::make('username')
    ->label('Pick an easy-to-remember, unique username');
```

You can also conditionally hide the description using:

```php
Step::make('username')
    ->hiddenDescription(true); // or a closure
```

### Customizing hint
By default the hint shows the tutorial's current progress in form of the current step number out of the total number of steps.
You can override the step using:

```php
Step::make('username')
    ->hint('Min. 6 characters');
```

You can also conditionally hide the hint using:

```php
Step::make('username')
    ->hiddenHint(true); // or a closure
```

### Customizing color
By default, every step uses the `primary` color from your filament admin panel. You can however customize the color using:

```php
Step::make('username')
    ->color('danger'); // or any other acceptable filament color parameter
```

### Pass through
By default, a step has an overlay around it, but the user can still interact with the targeted element (form field, action button, ...).

If you want to prevent this, for example in a case where you only want to showcase something to the user without allowing them to interact with the element itself, you can disable event pass through using:

```php
Step::make('username')
    ->passThrough(false);
```

This way they won't be able to interact with the targetted element.

### Intercepting clicks
Similarly, you might have created a `Step` for an `Action` button that you want the user to click on to show what happens.

For example, you might have a button that when clicked, will generate a random username. And as part of the tutorial, you want the user to click the button, trigger it's function (generate the username) but **also proceed to the next step**.

This is where this feature comes in handy, as the click will also cause the tutorial to proceed to the next step.

You can add it to your step using:

```php
Step::make('username')
    ->interceptClick();
```

### Customizing actions
By default, the step makes use of all built-in actions.

To override these actions, you can use the following functions:

```php
Step::make('username')
    ->nextStepAction(
        fn(NextStepAction $action) =>  // customize $action here
    )
    ->previousStepAction(
        fn(PreviousStepAction $action) =>  // customize $action here
    )
    ->skipTutorialAction(
        fn(SkipTutorialAction $action) =>  // customize $action here
    )
    ->completeTutorialAction(
        fn(CompleteTutorialAction $action) =>  // customize $action here
    );
```

You can also pass your own `TutorialAction` to these methods or pass `null` to disable the action.

For complete control over the actions rendered for the Step, you can use the `actions` function and pass an array of actions you want to render:

```php
Step::make('username')
    ->actions([
        PreviousStepAction::make(),
        NextStepAction::make(),
        MyCustomAction::make(),
    ])
```

### Utility Injection
Almost every function also accepts a Closure as parameter. These closures inject a variety of utilities for you to use, described below.

#### Injecting the current record
If you want to access the record from a given `Step`:
```php
use Illuminate\Database\Eloquent\Model;

function (?Model $record) {
    // ...
}
```

#### Injecting the current step
If you want to access the instance of the `Step` itself:
```php
use Guava\Tutorials\Steps\Step;

function (Step $step) {
    // ...
}
```

#### Injecting the tutorial
If you want to access the `Tutorial` instance that the `Step` belongs to:
```php
use Guava\Tutorials\Tutorial;

function (Tutorial $tutorial) { // or $container
    // ...
}
```

#### Injecting the form component
If your Step targets a `Form field`, you can inject the form component instance:
```php
use Filament\Forms\Components\Component;

function (Component $component) {
    // ...
}
```

#### Injecting the state of another form field
If your livewire component also contains a `Form`, you can access any form field's state using the `get` callback:
```php
use Filament\Forms\Get;

function (Get $get) {
    // ...
}
```

#### Injecting the current Livewire component instance
You can inject the current `Livewire component` instance using:
```php
use Livewire\Component;

function (Component $livewire) {
    // ...
}
```

## Actions
You can add multiple actions to a step to perform various tasks.

The plugin comes with a few built-in actions, such as:

1. NextStepAction: handles changing to the next step.
2. PreviousStepAction: handles changing to the previous step.
3. SkipTutorialAction: handles skipping the whole tutorial.
4. CompleteTutorialAction: handles completing the tutorial (last step).

Each of these actions are derived from `TutorialAction`, which you extend to create your own Actions if you'd like.

Actions have all the customization options like regular Filament actions. You can define the color, label, icon or conditionally hide them.

## Using multiple tutorials

By default, the `InteractsWithTutorials` trait only handles one tutorial per Livewire component - `tutorial()`. To add
more tutorials to the Livewire component, you can define them in the getTutorials() method, and return an array
containing the name of each tutorial:

```php
protected function getTutorials() : array
{
    return [
        'simpleTutorial',
        'advancedTutorial',
];
}
```

Each of these tutorials can now be defined within the Livewire component, using a method with the same name:

```php
public function simpleTutorial(Tutorial $tutorial) : Tutorial
{
    $tutorial->steps([
        //
    ]);
}
    
public function advancedTutorial(Tutorial $tutorial) : Tutorial
{
    $tutorial->steps([
        //
    ]);
}
```

To mount a specific tutorial, simply pass the name of the tutorial in the `mountTutorial(string $name)` function, such as:


```php
public function mount(): void
{
    parent::mount();
    
    $this->mountTutorial('simpleTutorial');
}
```
Again, it's completely up to you when you mount which tutorial.

#### Known Issues

There's some DOM diffing issues when using in a filament Dashboard Page. For some reason, the first widget is removed
during an update of the page when walking through the tutorial.

This is most likely a Livewire 3 issue (https://github.com/filamentphp/filament/issues/7567)

A quick fix is to publish the widgets.blade.php file and add `wire:ignore` to the container grid.

## Credits
- Guava
- All Contributors

Our documentation is highly inspired by the awesome Filament Documentation. Partly also because we tried to keep as close to the familiar Filament API as possible and a lot of things work the same.