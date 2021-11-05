import React from 'react';
import { withContext } from '../lib/context-hook';
import { useBooleanContext, useCounterContext, Page1Context } from './context';

const Element1 = () => {
  const [bool, setBool] = useBooleanContext();
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
  const [bool, setBool] = useBooleanContext();
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

const Page1 = () => {
  return (
    <div>
      <h2>Page 1</h2>
      <Element1 />
      <Element2 />
    </div>
  );
};

export default withContext(Page1, Page1Context);
