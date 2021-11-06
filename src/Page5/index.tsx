import React from 'react';
import { useBoolean, useCounterContext, PAGE5_CONTEXT } from './context';
import { withContextHook, toContextHook } from '../lib/to-context';

const Element1 = () => {
  const [bool, setBool] = toContextHook(useBoolean)();
  const [count, setCount] = useCounterContext();

  return (
    <div>
      <h2>{`Element 1: ${bool} - ${count}`}</h2>
      <button
        onClick={() => {
          setBool(!bool);
        }}
      >
        Toggle
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};

const Element2 = () => {
  const [bool, setBool] = toContextHook(useBoolean, 'page5')();
  const [count, setCount] = useCounterContext();

  return (
    <div>
      <h2>{`Element 2: ${bool} - ${count}`}</h2>
      <button
        onClick={() => {
          setBool(!bool);
        }}
      >
        Toggle
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};

const Page5 = () => {
  return (
    <div>
      <h2>Page 5</h2>
      <Element1 />
      <Element2 />
    </div>
  );
};

export default withContextHook(Page5, PAGE5_CONTEXT);
