import * as React from 'react';

const isDev = process.env.NODE_ENV !== 'production';

const NO_PROVIDER = {} as never;

function createUseContext<HookReturn>(
  context: React.Context<HookReturn>
): () => HookReturn {
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
  useNormalHook: () => HookReturn
): [React.FC<{}>, () => HookReturn] {
  const Context = React.createContext<HookReturn>(NO_PROVIDER);
  Context.displayName = useNormalHook.name;
  const useContext = createUseContext(Context);

  const Provider: React.ComponentType<React.PropsWithChildren<unknown>> = ({
    children,
  }) => {
    const value = useNormalHook();
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };
  Provider.displayName = '';

  return [Provider, useContext];
}

export default constate;
