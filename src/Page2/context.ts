import React from "react";
import constate from "../constate";

const useBoolean = () => {
  return React.useState(false);
};

export const [BooleanContext, useBooleanContext] = constate(useBoolean);

const useCounter = () => {
  return React.useState(1);
};

export const [CounterContext, useCounterContext] = constate(useCounter);
