import React from 'react';
import ReactDOM from 'react-dom';
import Async from 'react-code-splitting';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

ReactDOM.render(
  <BrowserRouter>
    <Async load={<Dashboard />} />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();
