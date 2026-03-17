import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@components/layout/MainLayout';

const HomePage = lazy(() => import('@pages/HomePage'));
const AuthPage = lazy(() => import('@pages/AuthPage'));
const AccountPage = lazy(() => import('@pages/AccountPage'));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div className="spinner" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;

