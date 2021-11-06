import React from 'react';
import { toContext } from '../lib/to-context';

const useCounter = (initialValue = 1) => {
  return React.useState(initialValue);
};

export const useCountFrom1 = () => useCounter(1);

export const useCountFrom1Context = toContext(useCountFrom1);
export const useCountFrom2Context = toContext(() => useCounter(2));
