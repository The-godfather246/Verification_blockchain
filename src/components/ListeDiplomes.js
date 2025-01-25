import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaFilter, FaDownload, FaQrcode } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../services/api';

const ListeContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;

  .liste-header {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    h2 {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #2c3e50;
    }
  }

  .controls {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .search-bar {
    flex: 1;
    position: relative;

    input {
      width: 100%;
      padding: 12px 40px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }

    .search-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #95a5a6;
    }
  }

  .filter-section {
    display: flex;
    gap: 10px;

    select {
      padding: 12px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      background: white;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }
  }
`;

const DiplomeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const DiplomeCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  .card-header {
    margin-bottom: 15px;
    
    h3 {
      color: #2c3e50;
      margin-bottom: 5px;
    }

    .institution {
      color: #7f8c8d;
      font-size: 0.9em;
    }
  }

  .card-content {
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;

      .label {
        color: #7f8c8d;
      }

      .value {
        color: #2c3e50;
        font-weight: 500;
      }
    }
  }

  .card-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;

    button {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      transition: background-color 0.2s ease;

      &.qr-button {
        background: #3498db;
        color: white;

        &:hover {
          background: #2980b9;
        }
      }

      &.download-button {
        background: #2ecc71;
        color: white;

        &:hover {
          background: #27ae60;
        }
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background: white;
    padding: 30px;
    border-radius: 15px;
    text-align: center;

    h3 {
      margin-bottom: 20px;
    }

    .qr-container {
      margin: 20px 0;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 10px;
      display: inline-block;
    }

    .close-button {
      margin-top: 20px;
      padding: 10px 20px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;

      &:hover {
        background: #c0392b;
      }
    }
  }
`;

function ListeDiplomes() {
  const [diplomes, setDiplomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [institutionFilter, setInstitutionFilter] = useState('');
  const [selectedDiplome, setSelectedDiplome] = useState(null);
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    loadDiplomes();
    // Rafraîchir la liste toutes les 10 secondes
    const interval = setInterval(loadDiplomes, 10000);
    
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(interval);
  }, []);

  const loadDiplomes = async () => {
    try {
      const data = await api.getDiplomes();
      console.log('Diplômes chargés:', data); // Pour le débogage
      setDiplomes(data);
      
      // Extraire les institutions uniques
      const uniqueInstitutions = [...new Set(data.map(d => d.institution))];
      setInstitutions(uniqueInstitutions);
      
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des diplômes:', error);
      setLoading(false);
    }
  };

  const filteredDiplomes = diplomes.filter(diplome => {
    const matchSearch = 
      diplome.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diplome.etudiant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diplome.institution.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchInstitution = 
      !institutionFilter || diplome.institution === institutionFilter;
    
    return matchSearch && matchInstitution;
  });

  const showQRCode = (diplome) => {
    setSelectedDiplome(diplome);
  };

  const downloadPDF = (diplome) => {
    // Logique pour générer et télécharger le PDF
    console.log('Téléchargement du PDF pour:', diplome);
  };

  if (loading) {
    return (
      <ListeContainer>
        <div className="liste-header">
          <h2>Chargement des diplômes...</h2>
        </div>
      </ListeContainer>
    );
  }

  return (
    <ListeContainer>
      <div className="liste-header">
        <h2>
          <FaFilter /> Liste des Diplômes
        </h2>
        
        <div className="controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un diplôme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-section">
            <select
              value={institutionFilter}
              onChange={(e) => setInstitutionFilter(e.target.value)}
            >
              <option value="">Toutes les institutions</option>
              {institutions.map((inst, index) => (
                <option key={index} value={inst}>{inst}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <DiplomeGrid>
        {filteredDiplomes.map((diplome, index) => (
          <DiplomeCard key={index}>
            <div className="card-header">
              <h3>{diplome.titre}</h3>
              <div className="institution">{diplome.institution}</div>
            </div>
            
            <div className="card-content">
              <div className="detail-row">
                <span className="label">Étudiant:</span>
                <span className="value">{diplome.etudiant}</span>
              </div>
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">
                  {new Date(diplome.dateObtention).toLocaleDateString()}
                </span>
              </div>
              {diplome.specialite && (
                <div className="detail-row">
                  <span className="label">Spécialité:</span>
                  <span className="value">{diplome.specialite}</span>
                </div>
              )}
              {diplome.mention && (
                <div className="detail-row">
                  <span className="label">Mention:</span>
                  <span className="value">{diplome.mention}</span>
                </div>
              )}
            </div>
            
            <div className="card-actions">
              <button className="qr-button" onClick={() => showQRCode(diplome)}>
                <FaQrcode /> QR Code
              </button>
              <button className="download-button" onClick={() => downloadPDF(diplome)}>
                <FaDownload /> PDF
              </button>
            </div>
          </DiplomeCard>
        ))}
      </DiplomeGrid>

      {selectedDiplome && (
        <Modal onClick={() => setSelectedDiplome(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>QR Code du Diplôme</h3>
            <div className="qr-container">
              <QRCodeSVG value={selectedDiplome.hash} size={256} />
            </div>
            <button className="close-button" onClick={() => setSelectedDiplome(null)}>
              Fermer
            </button>
          </div>
        </Modal>
      )}
    </ListeContainer>
  );
}

export default ListeDiplomes; 