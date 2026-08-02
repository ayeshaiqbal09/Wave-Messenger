# React State and Props

## Props
- Props are data passed from a parent component to a child component.
- They are similar to method parameters in C#.
- Props are read-only.

## State
- State is data owned by a component.
- Changing state causes React to re-render the UI.
- State should live in the closest common parent that needs the data.

## useState
- useState returns the current value and a setter function.
- Syntax:
  const [value, setValue] = useState(initialValue);

## Event Handling
- onChange is triggered whenever the input changes.
- event.target.value contains the current textbox value.