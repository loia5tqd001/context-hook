import React from 'react';
import { useBooleanContext, useCounterContext } from './context';

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

const Page2 = () => {
  return (
    <div>
      <h2>Page 2</h2>
      <Element1 />
      <Element2 />
    </div>
  );
};

export default Page2;
