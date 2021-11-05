import React from 'react';
import { useCountFrom1Context, useCountFrom2Context } from './context';

const Element1 = () => {
  const [count, setCount] = useCountFrom1Context();

  return (
    <div>
      <h2>{`Element 1: ${count}`}</h2>
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
  const [count, setCount] = useCountFrom2Context();

  return (
    <div>
      <h2>{`Element 2: ${count}`}</h2>
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

const Page3 = () => {
  return (
    <div>
      <h2>Page 3</h2>
      <Element1 />
      <Element2 />
    </div>
  );
};

export default Page3;
