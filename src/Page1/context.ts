import React from 'react';
import { toContextHook } from '../lib/context-hook';

export const PAGE1_CONTEXT = 'PAGE1';

const useBoolean = () => {
  return React.useState(false);
};

export const useBooleanContext = toContextHook(useBoolean, PAGE1_CONTEXT);

const useCounter = () => {
  return React.useState(1);
};

export const useCounterContext = toContextHook(useCounter, PAGE1_CONTEXT);
