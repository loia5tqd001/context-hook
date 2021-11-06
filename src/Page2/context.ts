import React from "react";
import { toContextHook } from '../lib/to-context';

const useBoolean = () => {
  return React.useState(false);
};

export const useBooleanContext = toContextHook(useBoolean);

const useCounter = () => {
  return React.useState(1);
};

export const useCounterContext = toContextHook(useCounter);
