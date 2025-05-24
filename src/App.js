import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Web3Provider } from './context/Web3Context';
import Home from './components/Home';
import CreationDiplome from './components/CreationDiplome';
import VerificationDiplome from './components/VerificationDiplome';
import ListeDiplomes from './components/ListeDiplomes';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminPanel from './components/Admin/AdminPanel';

// Style global
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f6fa;
`;

// Composant pour protéger les routes
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Web3Provider>
        <AppContainer>
          <Router>
            <Layout>
              <Routes>
                {/* Routes publiques */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Routes protégées */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />

                {/* Routes admin */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute roles={['ADMIN']}>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />

                {/* Routes agent de bureau */}
                <Route
                  path="/office"
                  element={
                    <ProtectedRoute roles={['OFFICE_AGENT', 'ADMIN']}>
                      <div>Page Agent de Bureau</div>
                    </ProtectedRoute>
                  }
                />

                {/* Routes vérificateur */}
                <Route
                  path="/verify"
                  element={
                    <ProtectedRoute roles={['VERIFIER', 'ADMIN']}>
                      <div>Page Vérification</div>
                    </ProtectedRoute>
                  }
                />

                {/* Routes de création et de vérification */}
                <Route path="/creation" element={<CreationDiplome />} />
                <Route path="/verification" element={<VerificationDiplome />} />
                <Route path="/liste" element={<ListeDiplomes />} />
              </Routes>
            </Layout>
          </Router>
        </AppContainer>
      </Web3Provider>
    </AuthProvider>
  );
};

export default App; 