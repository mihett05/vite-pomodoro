import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import AuthProvider from './AuthProvider';
import OffsetProvider from './OffsetProvider';
import HomePage from '../pages/home';
import SessionPage from '../pages/sessionPage';

function App() {
  return (
    <AuthProvider>
      <OffsetProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="sessions/:userId" element={<SessionPage />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </OffsetProvider>
    </AuthProvider>
  );
}

export default App;
