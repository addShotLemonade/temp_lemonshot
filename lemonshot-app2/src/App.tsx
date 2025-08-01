// App.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import AppRoutes from './routes/AppRoutes.tsx';
import IdealMatchFrame from './components/IdealMatchFrame';
import NavBar from './components/NavBar';
import NavBar2 from './pages/ConsentPage/NavBar2.tsx';
import './assets/fonts/fonts.css';

const App = () => {
  return (
    <>
      <AppRoutes />
    </>
    
  )
};

export default App;
