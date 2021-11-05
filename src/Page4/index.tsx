import React from 'react';
import { toContextHook, withContextHook } from '../lib/context-hook';

const useValue = toContextHook(() => {
  return React.useRef(1);
}, 'context-without-provider-maybe-for-typo-reason');

const Page4 = () => {
  const value = useValue();

  return (
    <div>
      <h2>Page 4 {value.current}. See the warning in the Console window.</h2>
    </div>
  );
};

export default withContextHook(Page4, 'context-without-consumers-maybe-for-typo-reason');
