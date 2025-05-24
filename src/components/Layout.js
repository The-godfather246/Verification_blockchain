import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import MetaMaskConnect from './auth/MetaMaskConnect';

const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  color: white;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #34495e;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: white;
    color: #2c3e50;
  }
`;

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo to="/">Blockchain Diplômes</Logo>
          <NavLinks>
            {isAuthenticated ? (
              <>
                <NavLink to="/">Accueil</NavLink>
                {user.role === 'ADMIN' && (
                  <NavLink to="/admin">Administration</NavLink>
                )}
                {(user.role === 'OFFICE_AGENT' || user.role === 'ADMIN') && (
                  <NavLink to="/creation">Création</NavLink>
                )}
                {(user.role === 'VERIFIER' || user.role === 'ADMIN') && (
                  <NavLink to="/verification">Vérification</NavLink>
                )}
                <UserSection>
                  <MetaMaskConnect />
                  <LogoutButton onClick={handleLogout}>Déconnexion</LogoutButton>
                </UserSection>
              </>
            ) : (
              <>
                <NavLink to="/login">Connexion</NavLink>
                <NavLink to="/register">Inscription</NavLink>
              </>
            )}
          </NavLinks>
        </NavContainer>
      </Nav>
      <Main>{children}</Main>
    </>
  );
};

export default Layout; 