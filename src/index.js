import React from 'react';
import ReactDOM from 'react-dom';
import Async from 'react-code-splitting';
import { BrowserRouter } from 'react-router-dom';

const Dashboard = () => <Async load={import('./pages/Dashboard')} />;

ReactDOM.render(
  <BrowserRouter>
    <Dashboard />
  </BrowserRouter>,
  document.getElementById('root')
);

//if (module.hot) module.hot.accept();
