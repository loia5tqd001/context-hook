import React from 'react';

type TProviderProps = React.PropsWithChildren<{ contextName?: TContextName }>;
type TProvider = React.ComponentType<TProviderProps>;
type TContextName = '__GLOBAL__' | string; // equals to just "string", but I put '__GLOBAL__' here for semantic reason
type TProviders = {
  [contextName: TContextName]: TProvider[];
};

const NO_PROVIDER = {} as never;

const providers: TProviders = {
  __GLOBAL__: [],
};

const getProviderKey = (key: TContextName | undefined): TContextName =>
  key === undefined ? '__GLOBAL__' : key;

const combineProviders = (providers: TProvider[]) =>
  providers.reduce((Combined, Provider) => ({ children }: TProviderProps) => {
    return (
      <Combined>
        <Provider>{children}</Provider>
      </Combined>
    );
  });

export function toContextHook<TReturn>(
  hook: () => TReturn, // only accept non-parameter hook
  contextName?: TContextName
) {
  const Context = React.createContext<TReturn>(NO_PROVIDER);
  const provider: TProvider = ({ children }) => {
    return <Context.Provider value={hook()}>{children}</Context.Provider>;
  };
  
  const providerKey = getProviderKey(contextName);
  if (providers[providerKey] === undefined) providers[providerKey] = [];
  provider.displayName = `ContextHookProvider.${providerKey}.${hook.name || 'NO_NAME'}`;
  providers[providerKey].push(provider); // TODO: display warning if the user tries to call the hook twice (use the hook in the way not intended)

  return () => React.useContext(Context);
}

export function ContextHookProvider(props: TProviderProps) {
  const providerKey = getProviderKey(props.contextName);
  // TODO: remove displayName for Provider
  const ContextProvider = combineProviders(providers[providerKey]); // TODO: handle exception
  return <ContextProvider>{props.children}</ContextProvider>;
}

export function withContextHook<Props>(
  Component: React.ComponentType<unknown>,
  contextName?: TContextName
) {
  // TODO: handle Component name
  return (props: Props) => {
    return (
      <ContextHookProvider contextName={contextName}>
        <Component {...props} />
      </ContextHookProvider>
    );
  };
}
