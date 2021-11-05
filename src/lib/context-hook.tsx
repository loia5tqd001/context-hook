import React from 'react';
import constate from './constate';

// Copied from here: https://preview.redd.it/pqxa0m08fum71.png?width=1756&format=png&auto=webp&s=0f2beb0e9d476bcf535c1fba0d5efc041356cf6b
export const combineProviders = (providers: React.ComponentType[]) =>
  providers.reduce(
    (Combined, Provider) =>
      function render({ children }: React.PropsWithChildren<unknown>) {
        return (
          <Combined>
            <Provider>{children}</Provider>
          </Combined>
        );
      }
  );

type ContextName = '__GLOBAL__' | string; // equals to just "string", but I put '__GLOBAL__' here for semantic reason
type Providers = {
  [contextName: ContextName]: React.ComponentType<
    React.PropsWithChildren<any>
  >[];
};

const providers: Providers = {
  __GLOBAL__: [],
};

const getProviderKey = (key: ContextName | undefined): ContextName =>
  key === undefined ? '__GLOBAL__' : key;

export function toContextHook<HookReturn>(
  hook: () => HookReturn, // only accept non-parameter function
  contextName?: ContextName
) {
  // TODO: check if hook has parameter then show warning
  const [provider, contextHook] = constate(hook);
  const providerKey = getProviderKey(contextName);
  if (providers[providerKey] === undefined) providers[providerKey] = [];
  providers[providerKey].push(provider); // TODO: display warning if the user tries to call the hook twice (use the hook in the way not intended)
  return contextHook;
}

export function ContextHookProvider(
  props: React.PropsWithChildren<{ contextName?: ContextName }>
) {
  const providerKey = getProviderKey(props.contextName);
  const ContextProvider = combineProviders(providers[providerKey]); // TODO: handle exception
  return <ContextProvider>{props.children}</ContextProvider>;
}

export function withContextHook<Props>(
  Component: React.ComponentType<unknown>,
  contextName?: ContextName
) {
  // TODO: handle Component name
  return function Children(props: Props) {
    return (
      <ContextHookProvider contextName={contextName}>
        <Component {...props} />
      </ContextHookProvider>
    );
  };
}
