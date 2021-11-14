import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import AuthProvider from './AuthProvider';
import HomePage from '../pages/home';
import SessionPage from '../pages/sessionPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="session/:userId" element={<SessionPage />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
