import React from 'react';
import { toContext, withToContext } from '../lib/to-context';

const useValue = toContext(() => {
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

export default withToContext(Page4, 'context-without-consumers-maybe-for-typo-reason');
