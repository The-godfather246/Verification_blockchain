import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaGraduationCap, FaQrcode, FaList, FaHome, FaBars, FaTimes } from 'react-icons/fa';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: #2c3e50;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    font-weight: bold;

    .logo-icon {
      font-size: 2rem;
    }
  }

  .menu-button {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 5px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    background: #2c3e50;
    flex-direction: column;
    padding: 80px 20px 20px;
    z-index: 100;

    .close-button {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.active ? '#3498db' : 'white'};
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #3498db;
  }

  .nav-icon {
    font-size: 1.2rem;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
  background: #f5f6fa;
`;

const Footer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 20px;
  text-align: center;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 10px;

    a {
      color: white;
      text-decoration: none;
      
      &:hover {
        color: #3498db;
      }
    }
  }

  .copyright {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <Link to="/" className="logo">
            <FaGraduationCap className="logo-icon" />
            BlockDoc
          </Link>

          <button className="menu-button" onClick={() => setIsMenuOpen(true)}>
            <FaBars />
          </button>

          <NavLinks isOpen={isMenuOpen}>
            {isMenuOpen && (
              <button className="close-button" onClick={() => setIsMenuOpen(false)}>
                <FaTimes />
              </button>
            )}
            
            <NavLink to="/" active={isActive('/')} onClick={() => setIsMenuOpen(false)}>
              <FaHome className="nav-icon" />
              Accueil
            </NavLink>
            
            <NavLink to="/creation" active={isActive('/creation')} onClick={() => setIsMenuOpen(false)}>
              <FaGraduationCap className="nav-icon" />
              Créer
            </NavLink>
            
            <NavLink to="/verification" active={isActive('/verification')} onClick={() => setIsMenuOpen(false)}>
              <FaQrcode className="nav-icon" />
              Vérifier
            </NavLink>
            
            <NavLink to="/liste" active={isActive('/liste')} onClick={() => setIsMenuOpen(false)}>
              <FaList className="nav-icon" />
              Liste
            </NavLink>
          </NavLinks>
        </Nav>
      </Header>

      <Main>
        {children}
      </Main>

      <Footer>
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">À propos</a>
            <a href="#">Contact</a>
            <a href="#">Mentions légales</a>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} BlockDoc. Tous droits réservés.
          </div>
        </div>
      </Footer>
    </LayoutContainer>
  );
}

export default Layout; 