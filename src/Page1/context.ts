import React from 'react';
import constate from '../lib/constate';
import { combineProviders } from '../lib/context-hook';

const useBoolean = () => {
  return React.useState(false);
};

export const [BooleanContext, useBooleanContext] = constate(useBoolean);

const useCounter = () => {
  return React.useState(1);
};

export const [CounterContext, useCounterContext] = constate(useCounter);

export const Page1Context = combineProviders([BooleanContext, CounterContext]);
