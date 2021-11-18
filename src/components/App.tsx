import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import AuthProvider from '../contexts/AuthProvider';
import OffsetProvider from '../contexts/OffsetProvider';
import UsersProvider from '../contexts/UsersProvider';

import HomePage from '../pages/home';
import SessionPage from '../pages/sessionPage';

function App() {
  return (
    <AuthProvider>
      <OffsetProvider>
        <UsersProvider>
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
        </UsersProvider>
      </OffsetProvider>
    </AuthProvider>
  );
}

export default App;
