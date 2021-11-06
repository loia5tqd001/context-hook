<p align="center">
  <img src="/logo/Logo.png" alt="context-hook logo" width="350" />
</p>

The simpliest API to turn a normal React custom hook into a "Context Hook", which means not just the stateful logic but the states are also shared.

> I use this package in my projects in place of Redux

## Installation

npm:

```sh
npm install context-hook
```

yarn:

```sh
yarn add context-hook
```

## Usage

1. First, you need to use either `ContextHookProvider` or `withContextHook` to wrap our provider around your application, **this only needs to be done once**.

```jsx
function App() {
  // Wrap your App with ContextHookProvider
  return (
    <ContextHookProvider>
      <Button />
      <Count />
    </ContextHookProvider>
  );
}

export default withContextHook(App); // Or by using the HOC syntax
```

2. Turn any normal React custom hook into a context-hook by using `toContextHook`.

```jsx
// Create a normal custom hook as usual
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prevCount) => prevCount + 1);
  return { count, increment };
}

// Turn the custom hook into a context-hook
const useCounterContext = toContextHook(useCounter);

function Button() {
  // Use the context-hook
  const { increment } = useCounterContext();
  return <button onClick={increment}>+</button>;
}

function Count() {
  // Use the context-hook in other components
  const { count } = useCounterContext();
  return <span>{count}</span>;
}
```

## API

This library only has 3 public APIs: `toContextHook`, `ContextHookProvider`, and `withContextHook` _- usually the last 2 you only need to touch once_.

### `toContextHook(hook, contextName?)`

```jsx
import { toContextHook } from 'context-hook';

// a normal custom hook
const useCounter = () => {};

// turn the custom hook into a context-hook
const useCounterContext = toContextHook(useCounter);
```

#### `hook: () => TReturn`

The hook to turn into a context-hook, **this can only be a non-parametered function**. For hooks with parameters usage, you need to convert the parametered one to non-parameterd one, can refer to [this example]().

#### `contextName?: string`

If you want all of your context-hooks to behave like they are under a global context (see Redux), you don't need to care about `contextName`.

However, if you want some of your context-hooks to behave like they are under a specific context level lower than global level in component tree, you can specify the `contextName`. You then need to wrap another `ContextHookProvider`/`withContextHook` around that component tree level with the corresponding `contextName` to make it work. Can refer to [this example]().

### `ContextHookProvider({ contextName? })`

The context provider of context-hooks. Normally you will want to wrap a global (without `contextName`) one around your whole application and that's it. However if you want to make a custom context level in your component tree, can use `contextName`, may refer to [this example]().

```jsx
function App() {
  // Wrap your App with ContextHookProvider
  return (
    <ContextHookProvider>
      <Button />
      <Count />
    </ContextHookProvider>
  );
}
```

```jsx
const useCounterPage1Context = toContextHook(useCounter, 'PAGE1_CONTEXT');

function Page1() {
  // For whatever reason, you may want to wrap your Page 1 around a custom context level
  return (
    <ContextHookProvider contextName='PAGE1_CONTEXT'>
      <Button />
      <Count />
    </ContextHookProvider>
  );
}
```

### `withContextHook(Component, contextName?)`

It works like `ContextHookProvider` but sometimes you'll prefer this HOC syntax.

```jsx
export default withContextHook(App); // Wrap your App with withContextHook because you prefer it over ContextHookProvider
```

```jsx
export default withContextHook(Page1, 'PAGE1_CONTEXT'); // You may want to use the HOC syntax to wrap your Page1 around a custom context level
```

## FAQ

## Comparasion

<br >
<br >
<br >
<br >
<br >
<br >
<br >
<br >

#### `hook: () => TValue`

#### `contextName: string`

### `ContextHookProvider({ contextName? })`

### `withContextHook(Component, contextName?)`

It's any [custom hook](https://reactjs.org/docs/hooks-custom.html):

```js
import { useState } from 'react';
import constate from 'constate';

const [CountProvider, useCountContext] = constate(() => {
  const [count] = useState(0);
  return count;
});
```

You can receive props in the custom hook function. They will be populated with `<Provider />`:

```jsx
const [CountProvider, useCountContext] = constate(({ initialCount = 0 }) => {
  const [count] = useState(initialCount);
  return count;
});

function App() {
  return <CountProvider initialCount={10}>...</CountProvider>;
}
```

The API of the containerized hook returns the same value(s) as the original, as long as it is a descendant of the Provider:

```jsx
function Count() {
  const count = useCountContext();
  console.log(count); // 10
}
```

#### `selectors`

Optionally, you can pass in one or more functions to split the custom hook value into multiple React Contexts. This is useful so you can avoid unnecessary re-renders on components that only depend on a part of the state.

A `selector` function receives the value returned by [`useValue`](#usevalue) and returns the value that will be held by that particular Context.

```jsx
import React, { useState, useCallback } from 'react';
import constate from 'constate';

function useCounter() {
  const [count, setCount] = useState(0);
  // increment's reference identity will never change
  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  return { count, increment };
}

const [Provider, useCount, useIncrement] = constate(
  useCounter,
  (value) => value.count, // becomes useCount
  (value) => value.increment // becomes useIncrement
);

function Button() {
  // since increment never changes, this will never trigger a re-render
  const increment = useIncrement();
  return <button onClick={increment}>+</button>;
}

function Count() {
  const count = useCount();
  return <span>{count}</span>;
}
```

## Contributing

If you find a bug, please [create an issue](https://github.com/diegohaz/constate/issues/new) providing instructions to reproduce it. It's always very appreciable if you find the time to fix it. In this case, please [submit a PR](https://github.com/diegohaz/constate/pulls).

If you're a beginner, it'll be a pleasure to help you contribute. You can start by reading [the beginner's guide to contributing to a GitHub project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/).

When working on this codebase, please use `yarn`. Run `yarn examples` to run examples.

## License

MIT © [Diego Haz](https://github.com/diegohaz)
