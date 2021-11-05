import constate from './constate';

export function withContext<Props>(
  Component: React.ComponentType<Props>,
  Context: React.ComponentType<React.PropsWithChildren<unknown>>
) {
  return function children(props: Props) {
    return (
      <Context>
        <Component {...props} />
      </Context>
    );
  };
}

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

const providers: React.ComponentType<React.PropsWithChildren<any>>[] = [];

export function toContextHook<Props, Value>(useValue: (props: Props) => Value) {
  const [provider, hook] = constate(useValue);
  providers.push(provider);
  return hook;
}

export function ContextHookProvider(props: React.PropsWithChildren<unknown>) {
  const GlobalContext = combineProviders(providers);
  return <GlobalContext>{props.children}</GlobalContext>;
}

export function withContextHook(Component: React.ComponentType<unknown>) {
  return withContext(Component, ContextHookProvider);
}
