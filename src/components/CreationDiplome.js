import React, { useState } from 'react';
import { useContract } from '../hooks/useContract';
import { QRCodeSVG } from 'qrcode.react';
import { FaGraduationCap, FaUser, FaUniversity, FaQrcode } from 'react-icons/fa';
import styled from 'styled-components';
import { api } from '../services/api';

const CreationContainer = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;

  .creation-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-header {
    text-align: center;
    margin-bottom: 30px;

    .header-icon {
      font-size: 2.5rem;
      color: #3498db;
      margin-bottom: 15px;
    }
  }

  .diplome-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    position: relative;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #3498db;
  }

  input {
    width: 100%;
    padding: 12px;
    padding-left: 40px;
    border: 2px solid #e1e1e1;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }

  .submit-button {
    background: #3498db;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background: #2980b9;
    }

    &:disabled {
      background: #95a5a6;
      cursor: not-allowed;
    }
  }

  .success-container {
    text-align: center;

    .success-header {
      margin-bottom: 30px;

      .header-icon {
        font-size: 2.5rem;
        color: #3498db;
        margin-bottom: 15px;
      }
    }

    .qr-container {
      margin: 30px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      display: inline-block;
    }

    .hash-info {
      margin: 20px 0;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 8px;

      code {
        display: block;
        padding: 10px;
        background: #e9ecef;
        border-radius: 5px;
        word-break: break-all;
        margin-top: 10px;
      }
    }

    .action-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-top: 30px;

      button {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
        }
      }

      .print-button {
        background: #3498db;
        color: white;
      }

      .new-button {
        background: #e9ecef;
        color: #2c3e50;
      }
    }
  }

  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .action-buttons {
      flex-direction: column;
    }
  }

  @media print {
    * {
      visibility: hidden;
    }
    
    .qr-container, .qr-container * {
      visibility: visible;
    }
    
    .qr-container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

function CreationDiplome() {
  const { creerDiplome } = useContract();
  const [loading, setLoading] = useState(false);
  const [diplomeInfo, setDiplomeInfo] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    titre: '',
    etudiant: '',
    institution: '',
    dateObtention: '',
    specialite: '',
    mention: '',
    numeroEtudiant: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Créer un objet avec toutes les données du diplôme
      const diplomeData = {
        ...formData,
        dateCreation: new Date().toISOString()
      };

      // Créer un hash à partir des données
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(diplomeData));
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Ajouter le hash aux données
      diplomeData.hash = hashHex;

      // Envoyer les données à l'API
      const savedDiplome = await api.creerDiplome(diplomeData);
      
      // Mettre à jour l'état avec les données sauvegardées
      setDiplomeInfo(savedDiplome);
      setStep(2);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création du diplôme');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      titre: '',
      etudiant: '',
      institution: '',
      dateObtention: '',
      specialite: '',
      mention: '',
      numeroEtudiant: ''
    });
    setDiplomeInfo(null);
  };

  return (
    <CreationContainer>
      <div className="creation-container">
        {step === 1 ? (
          <>
            <div className="form-header">
              <FaGraduationCap className="header-icon" />
              <h2>Création d'un Nouveau Diplôme</h2>
            </div>

            <form onSubmit={handleSubmit} className="diplome-form">
              <div className="form-group">
                <FaGraduationCap className="input-icon" />
                <input
                  type="text"
                  value={formData.titre}
                  onChange={(e) => setFormData({...formData, titre: e.target.value})}
                  required
                  placeholder="Titre du Diplôme"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    value={formData.etudiant}
                    onChange={(e) => setFormData({...formData, etudiant: e.target.value})}
                    required
                    placeholder="Nom de l'Étudiant"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    value={formData.numeroEtudiant}
                    onChange={(e) => setFormData({...formData, numeroEtudiant: e.target.value})}
                    required
                    placeholder="Numéro Étudiant"
                  />
                </div>
              </div>

              <div className="form-group">
                <FaUniversity className="input-icon" />
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  required
                  placeholder="Institution"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    value={formData.specialite}
                    onChange={(e) => setFormData({...formData, specialite: e.target.value})}
                    placeholder="Spécialité"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    value={formData.mention}
                    onChange={(e) => setFormData({...formData, mention: e.target.value})}
                    placeholder="Mention"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="date"
                  value={formData.dateObtention}
                  onChange={(e) => setFormData({...formData, dateObtention: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Création en cours...' : 'Créer le Diplôme'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-container">
            <div className="success-header">
              <FaQrcode className="header-icon" />
              <h2>Diplôme Créé avec Succès!</h2>
            </div>
            
            <div className="qr-container">
              <QRCodeSVG value={diplomeInfo.hash} size={256} />
            </div>
            
            <div className="hash-info">
              <p>Hash du diplôme:</p>
              <code>{diplomeInfo.hash}</code>
            </div>

            <div className="diplome-details">
              <p><strong>Titre:</strong> {diplomeInfo.titre}</p>
              <p><strong>Étudiant:</strong> {diplomeInfo.etudiant}</p>
              <p><strong>Institution:</strong> {diplomeInfo.institution}</p>
              <p><strong>Date d'obtention:</strong> {diplomeInfo.dateObtention}</p>
            </div>
            
            <div className="action-buttons">
              <button onClick={() => window.print()} className="print-button">
                Imprimer le QR Code
              </button>
              <button onClick={resetForm} className="new-button">
                Créer un nouveau diplôme
              </button>
            </div>
          </div>
        )}
      </div>
    </CreationContainer>
  );
}

export default CreationDiplome; 