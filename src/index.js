import React from 'react';
import ReactDOM from 'react-dom';
import LazyTaste from './components/LazyTaste';
import './assets/scss/main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <LazyTaste />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

