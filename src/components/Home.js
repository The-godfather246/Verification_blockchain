import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaSearch, FaUniversity } from 'react-icons/fa';
import styled from 'styled-components';

const HomeContainer = styled.div`
  .hero {
    background: linear-gradient(135deg, #2c3e50, #3498db);
    color: white;
    padding: 100px 20px;
    text-align: center;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 40px;
    opacity: 0.9;
  }

  .cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  .cta-button {
    padding: 15px 30px;
    border-radius: 30px;
    text-decoration: none;
    font-weight: bold;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-3px);
    }

    &.primary {
      background-color: #e74c3c;
      color: white;
    }

    &.secondary {
      background-color: transparent;
      border: 2px solid white;
      color: white;
    }
  }

  .features {
    padding: 80px 20px;
    background-color: #f5f6fa;

    h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .feature-card {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }
  }

  .feature-icon {
    font-size: 3rem;
    color: #3498db;
    margin-bottom: 20px;
  }

  .how-it-works {
    padding: 80px 20px;

    h2 {
      text-align: center;
      margin-bottom: 50px;
      font-size: 2.5rem;
    }
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .step {
    text-align: center;
    padding: 20px;
  }

  .step-number {
    width: 40px;
    height: 40px;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    .subtitle {
      font-size: 1.2rem;
    }
    
    .cta-buttons {
      flex-direction: column;
    }
    
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function Home() {
  return (
    <HomeContainer>
      <section className="hero">
        <div className="hero-content">
          <h1>BlockDoc</h1>
          <p className="subtitle">Sécurisez et vérifiez vos diplômes avec la blockchain</p>
          <div className="cta-buttons">
           
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Nos Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaGraduationCap className="feature-icon" />
            <h3>Émission de Diplômes</h3>
            <p>Créez et émettez des diplômes numériques sécurisés sur la blockchain</p>
          </div>

          <div className="feature-card">
            <FaSearch className="feature-icon" />
            <h3>Vérification Instantanée</h3>
            <p>Vérifiez l'authenticité des diplômes en quelques secondes</p>
          </div>

          <div className="feature-card">
            <FaUniversity className="feature-icon" />
            <h3>Gestion Institutionnelle</h3>
            <p>Interface dédiée pour les établissements d'enseignement</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Comment ça marche ?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Création du Diplôme</h3>
            <p>L'institution crée le diplôme numérique avec les informations de l'étudiant</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Enregistrement Blockchain</h3>
            <p>Le diplôme est enregistré de manière immuable sur la blockchain</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Vérification</h3>
            <p>Le diplôme peut être vérifié instantanément par n'importe qui</p>
          </div>
        </div>
      </section>
    </HomeContainer>
  );
}

export default Home; 