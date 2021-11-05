import * as React from 'react';

const isDev = process.env.NODE_ENV !== 'production';

const NO_PROVIDER = {};

function createUseContext(context: React.Context<any>): any {
  return () => {
    const value = React.useContext(context);
    if (isDev && value === NO_PROVIDER) {
      const warnMessage = context.displayName
        ? `The context consumer of ${context.displayName} must be wrapped with its corresponding Provider`
        : 'Component must be wrapped with Provider.';
      // eslint-disable-next-line no-console
      console.warn(warnMessage);
    }
    return value;
  };
}

function constate<HookReturn>(
  useCustomHook: () => HookReturn
): [React.FC<{}>, () => HookReturn] {
  const context = React.createContext(NO_PROVIDER);
  context.displayName = useCustomHook.name;
  const hook: () => HookReturn = createUseContext(context);

  const Provider: React.ComponentType<React.PropsWithChildren<unknown>> = ({
    children,
  }) => {
    const value = useCustomHook();
    return <context.Provider value={value}>{children}</context.Provider>;
  };

  if (isDev && useCustomHook.name) {
    Provider.displayName = 'Constate';
  }

  return [Provider, hook];
}

export default constate;
