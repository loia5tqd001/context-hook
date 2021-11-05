import React from 'react';
import { toContextHook } from '../lib/context-hook';

export const PAGE5_CONTEXT = 'PAGE5';

export const useBoolean = () => {
  return React.useState(false);
};

export const useCounter = () => {
  return React.useState(1);
};

export const useCounterContext = toContextHook(useCounter, PAGE5_CONTEXT);
