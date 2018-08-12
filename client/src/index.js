import React from 'react';
import ReactDOM from 'react-dom';
import App from './core/App';
import registerServiceWorker from './core/registerServiceWorker';

const start = async() => {
  const Pages = await import(/* webpackChunkName: 'pages' */ './pages/Pages');
  ReactDOM.render(<App Pages={Pages.default} />, document.getElementById('root'));
  registerServiceWorker();
};

start();



