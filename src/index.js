import React from 'react';
import ReactDOM from 'react-dom';
import Async from 'react-code-splitting';
import { BrowserRouter } from 'react-router-dom';

import dboard from './pages/Dashboard';

const Dashboard = () => <Async load={dboard} />;

ReactDOM.render(
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) module.hot.accept();
