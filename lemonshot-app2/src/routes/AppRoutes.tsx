// routes/AppRoutes.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage.tsx';
import ConsentPage from '../pages/ConsentPage/ConsentPage.tsx';
import UserInfoPage from '../pages/UserInfoPage/UserInfoPage.tsx'
import CameraPage from '../pages/CameraPage/CameraPage.tsx';
import SuccessPage from '../pages/SuccessPage/Success.tsx';
import IdealWorldcupPage from '../pages/IdealWorldcupPage/IdealWorldcupPage.tsx';
import FinalPage from '../pages/FinalPage/FinalPage.tsx';
import FinalMessage from '../pages/FinalMessagePage/FinalMessagePage.tsx';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/consent" element={<ConsentPage />} />
    <Route path="/userinfo" element={<UserInfoPage />} />
    <Route path="/camera" element={<CameraPage />} />
    <Route path="/success" element={<SuccessPage />} />
    <Route path="/idealworldcup" element={<IdealWorldcupPage />} />
    <Route path="/final" element={<FinalPage />} />
    <Route path="/finalmessage" element={<FinalMessage />} />
    
    
    
    {/*<Route path="/consent" element={<ConsentPage />} /> */}
  </Routes>
);

export default AppRoutes;