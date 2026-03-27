/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Talent from './pages/Talent';
import Training from './pages/Training';
import FindTalent from './pages/FindTalent';
import JoinAsDeveloper from './pages/JoinAsDeveloper';
import JoinAsLearner from './pages/JoinAsLearner';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/talent" element={<Talent />} />
          <Route path="/training" element={<Training />} />
          <Route path="/find-talent" element={<FindTalent />} />
          <Route path="/join-as-developer" element={<JoinAsDeveloper />} />
          <Route path="/join-as-learner" element={<JoinAsLearner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
