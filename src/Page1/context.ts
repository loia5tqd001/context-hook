import React from 'react';
import constate from '../constate';
import { combineProviders } from '../context-hook';

const useBoolean = () => {
  return React.useState(false);
};

export const [BooleanContext, useBooleanContext] = constate(useBoolean);

const useCounter = () => {
  return React.useState(1);
};

export const [CounterContext, useCounterContext] = constate(useCounter);

export const Page1Context = combineProviders([BooleanContext, CounterContext]);
