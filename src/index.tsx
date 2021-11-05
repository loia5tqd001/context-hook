import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ContextHookProvider } from './context-hook';
import Page1 from './Page1';
import Page2 from './Page2';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to='/'>Page1</Link>
          </li>
          <li>
            <Link to='/page2'>Page2</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path='/' element={<Page1 />} />
          <Route path='/page2' element={<Page2 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ContextHookProvider>
      <App />
    </ContextHookProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
