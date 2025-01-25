import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Web3Provider } from './context/Web3Context';
import Home from './components/Home';
import CreationDiplome from './components/CreationDiplome';
import VerificationDiplome from './components/VerificationDiplome';
import ListeDiplomes from './components/ListeDiplomes';
import Layout from './components/Layout';

// Style global
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f6fa;
`;

function App() {
  return (
    <Web3Provider>
      <AppContainer>
        <Router>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/creation" element={<CreationDiplome />} />
              <Route path="/verification" element={<VerificationDiplome />} />
              <Route path="/liste" element={<ListeDiplomes />} />
            </Routes>
          </Layout>
        </Router>
      </AppContainer>
    </Web3Provider>
  );
}

export default App; 