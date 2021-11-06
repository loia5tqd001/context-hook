import React from 'react';
import { toContext } from '../lib/to-context';

export const PAGE1_CONTEXT = 'PAGE1';

const useBoolean = () => {
  return React.useState(false);
};

export const useBooleanContext = toContext(useBoolean, PAGE1_CONTEXT);

const useCounter = () => {
  return React.useState(1);
};

export const useCounterContext = toContext(useCounter, PAGE1_CONTEXT);
