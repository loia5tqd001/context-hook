import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ContextHookProvider } from './lib/context-hook';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to='/'>Page1 - page-level context</Link>
          </li>
          <li>
            <Link to='/page2'>Page2 - global context</Link>
          </li>
          <li>
            <Link to='/page3'>Page3 - hook with parameter</Link>
          </li>
          <li>
            <Link to='/page4'>Page4 - warning</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path='/' element={<Page1 />} />
          <Route path='/page2' element={<Page2 />} />
          <Route path='/page3' element={<Page3 />} />
          <Route path='/page4' element={<Page4 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ContextHookProvider>
      <ContextHookProvider contextName="context-not-being-consumed">
        <App />
      </ContextHookProvider>
    </ContextHookProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
