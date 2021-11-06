import React from "react";
import { toContext } from '../lib/to-context';

const useBoolean = () => {
  return React.useState(false);
};

export const useBooleanContext = toContext(useBoolean);

const useCounter = () => {
  return React.useState(1);
};

export const useCounterContext = toContext(useCounter);
