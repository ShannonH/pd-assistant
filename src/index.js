import React from 'react';
import ReactDOM from 'react-dom';
import './home.css';
import Async from 'react-code-splitting';
import * as serviceWorker from './serviceWorker';

const Dashboard = () => <Async load={import('./pages/Dashboard')} />;

ReactDOM.render(<Dashboard />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
