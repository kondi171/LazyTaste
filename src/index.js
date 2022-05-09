import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import LazyTaste from './components/LazyTaste';
import './assets/scss/main.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Router>
      <LazyTaste />
    </Router>
  </StrictMode>
);

