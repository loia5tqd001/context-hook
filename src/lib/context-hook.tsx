import React from 'react';

type TProviderProps = React.PropsWithChildren<{ contextName?: TContextName }>;
type TProvider = React.ComponentType<TProviderProps>;
type TContextName = string;
type TProviders = {
  [contextName: TContextName]: TProvider[];
};

const NO_PROVIDER = {} as never;

const GLOBAL_CONTEXT_NAME = '__GLOBAL__';

const providers: TProviders = {};

const getProviderKey = (key: TContextName | undefined): TContextName =>
  key === undefined ? GLOBAL_CONTEXT_NAME : key;

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
  const providerKey = getProviderKey(contextName);
  if (providers[providerKey] === undefined) providers[providerKey] = [];

  const Context = React.createContext<TReturn>(NO_PROVIDER);
  const provider: TProvider = ({ children }) => {
    return <Context.Provider value={hook()}>{children}</Context.Provider>;
  };
  provider.displayName = `ContextHookProvider.${providerKey}.${
    hook.name || 'Anonymous'
  }`;

  providers[providerKey].push(provider); // TODO: display warning if the user tries to call the hook twice (use the hook in the way not intended)

  return () => {
    const contextValue = React.useContext(Context);
    if (contextValue === NO_PROVIDER) {
      console.warn(
        `[context-hook]: You forgot to wrap provider "${providerKey}" around its consumers (by either ContextHookProvider or withContextHook)`
      );
    }
    return contextValue;
  };
}

export function ContextHookProvider(props: TProviderProps) {
  const providerKey = getProviderKey(props.contextName);

  if (providers[providerKey] === undefined) {
    console.warn(
      `[context-hook]: Provider "${providerKey}" is not consumed anywhere!`
    );
    return props.children as JSX.Element;
  }

  const ContextProvider = combineProviders(providers[providerKey]);

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
