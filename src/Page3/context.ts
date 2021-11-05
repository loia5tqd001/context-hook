import React from 'react';
import { toContextHook } from '../lib/context-hook';

const useCounter = (initialValue = 1) => {
  return React.useState(initialValue);
};

export const useCountFrom1 = () => useCounter(1);

export const useCountFrom1Context = toContextHook(useCountFrom1);
export const useCountFrom2Context = toContextHook(() => useCounter(2));
