<p align="center">
  <img src="/logo/Logo.png" alt="to-context logo" width="350" />
</p>

The simpliest API ever to bring an arbitrary React custom hook into the global context.

> I use this package in my projects in place of Redux

## Installation

npm:

```sh
npm install to-context
```

yarn:

```sh
yarn add to-context
```

## Usage

1. First, you need to use either [`ToContextProvider`] or [`withToContext`] to wrap around your application.

```jsx
function App() {
  // Wrap your App with ToContextProvider
  return (
    <ToContextProvider>
      <Button />
      <Count />
    </ToContextProvider>
  );
}

export default withToContext(App); // Or by using the HOC syntax
```

2. Turn any normal React custom hook into context by using [`toContext`].

```jsx
import { toContext } from 'to-context';

// Create a normal custom hook as usual
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prevCount) => prevCount + 1);
  return { count, increment };
}

// Turn the custom hook into a context
const useCounterContext = toContext(useCounter);

function Button() {
  // Use the context
  const { increment } = useCounterContext();
  return <button onClick={increment}>+</button>;
}

function Count() {
  // Use the context in another component
  const { count } = useCounterContext();
  return <span>{count}</span>;
}
```

[`tocontext`]: #tocontexthook-contextname
[`tocontextprovider`]: #tocontextprovider-contextname-
[`withtocontext`]: #withtocontextcomponent-contextname

## API

This library only has 3 public APIs: [`toContext`], [`ToContextProvider`], and [`withToContext`] _- usually the last 2 you only need to touch once_.

### `toContext(hook, contextName?)`

```jsx
import { toContext } from 'to-context';

// a normal custom hook
const useCounter = () => {};

// turn the custom hook into a context
const useCounterContext = toContext(useCounter);
```

#### `hook: () => TReturn`

The hook to turn into a context, **this can only be a non-parametered function**. For hooks with parameters usage, you need to convert the parametered one to non-parameterd one, can refer to [this example]().

#### `contextName?: string`

If you want all of your hooks to behave like they are under the global context (like Redux store), you don't need to care about `contextName`.

However, if you want some of your contexts to be around a specific portion lower than the global level in component tree, you can use `contextName`. You then need to wrap another `ToContextProvider`/`withToContext` around that component tree level with the corresponding `contextName` used in [`toContext`]. Can refer to [this example]().

### `ToContextProvider({ contextName? })`

Normally you will want to wrap a global `ToContextProvider` (without `contextName`) once around your whole application and that's it.

**Global Provider (without `contextName`)**

```jsx
function App() {
  // Wrap your App with ToContextProvider
  return (
    <ToContextProvider>
      <Button />
      <Count />
    </ToContextProvider>
  );
}
```

However if you want to make a custom context level in your component tree, can use another one with `contextName`, may refer to [this example]().

**Portional level Provider (with `contextName`)**

```jsx
// Two hooks below are wrapped under a context separately from the global one
const useCounterPage1 = toContext(useCounter, 'PAGE1_CONTEXT');
const useTogglePage1 = toContext(useToggle, 'PAGE1_CONTEXT');

function Page1() {
  // Create context around your Page 1 separately from the global level one
  return (
    <ToContextProvider contextName='PAGE1_CONTEXT'>
      <Button />
      <Count />
    </ToContextProvider>
  );
}
```

### `withToContext(Component, contextName?)`

It works like [`ToContextProvider`] but sometimes you'll prefer the HOC syntax.

**without `contextName`**

```jsx
export default withToContext(App);
```

**with `contextName`**

```jsx
export default withToContext(Page1, 'PAGE1_CONTEXT');
```

## FAQ

## Comparasion

## Contributing

## License

MIT License
