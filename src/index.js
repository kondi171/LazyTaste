import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import LazyTaste from './components/LazyTaste';
import './assets/scss/main.scss';
import AppProvider from './components/contexts/AppContext';

// const root = createRoot(document.getElementById('root'));
// root.render(
//   <StrictMode>
//     <Router>
//       <LazyTaste />
//     </Router>
//   </StrictMode>
// );
ReactDOM.render(
  <StrictMode>
    <AppProvider>
      <Router>
        <LazyTaste />
      </Router>
    </AppProvider>
  </StrictMode>,
  document.getElementById('root')
);
