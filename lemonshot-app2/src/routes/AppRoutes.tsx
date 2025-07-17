// routes/AppRoutes.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage.tsx';
import ConsentPage from '../pages/ConsentPage/ConsentPage.tsx';
import UserInfoPage from '../pages/UserInfoPage/UserInfoPage.tsx'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/consent" element={<ConsentPage />} />
    <Route path="/userinfo" element={<UserInfoPage />} />
    
    {/*<Route path="/consent" element={<ConsentPage />} /> */}
  </Routes>
);

export default AppRoutes;