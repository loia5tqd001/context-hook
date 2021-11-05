import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import {
  BooleanContext as BooleanContext2,
  CounterContext as CounterContext2
} from './Page2/context';

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
    <BooleanContext2>
      <CounterContext2>
        <App />
      </CounterContext2>
    </BooleanContext2>
  </React.StrictMode>,
  document.getElementById('root')
);
