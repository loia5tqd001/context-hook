import React from 'react';
import { toContext } from '../lib/to-context';

export const PAGE5_CONTEXT = 'PAGE5';

export const useBoolean = () => {
  return React.useState(false);
};

export const useCounter = () => {
  return React.useState(1);
};

export const useCounterContext = toContext(useCounter, PAGE5_CONTEXT);
