import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { FaSearch, FaQrcode, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Définir l'URL de l'API
const API_URL = 'http://localhost:5000/api'; // Assurez-vous que cela correspond à votre configuration

const VerificationContainer = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;

  .verification-container {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .verification-header {
    text-align: center;
    margin-bottom: 30px;

    .header-icon {
      font-size: 2.5rem;
      color: #3498db;
      margin-bottom: 15px;
    }
  }

  .verification-methods {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 20px;
    align-items: center;
  }

  .scanner-section, .manual-section {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
  }

  .divider {
    font-weight: bold;
    color: #6c757d;
    text-align: center;
  }

  #reader {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  .hash-form {
    display: flex;
    gap: 10px;

    input {
      flex: 1;
      padding: 12px;
      border: 2px solid #e1e1e1;
      border-radius: 8px;
      font-size: 16px;

      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }

    button {
      padding: 12px 24px;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;

      &:hover {
        background: #2980b9;
      }

      &:disabled {
        background: #95a5a6;
      }
    }
  }

  .result-container {
    margin-top: 30px;
    padding: 20px;
    border-radius: 10px;

    &.valid {
      background: #f0fff4;
      border: 2px solid #48bb78;
    }

    &.invalid {
      background: #fff5f5;
      border: 2px solid #f56565;
    }

    .result-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;

      .result-icon {
        font-size: 2rem;

        &.success { color: #48bb78; }
        &.warning { color: #ed8936; }
        &.error { color: #f56565; }
      }
    }

    .diplome-details {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .detail-row {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 5px;

        &.status {
          font-weight: bold;
        }

        .verified { color: #48bb78; }
        .unverified { color: #ed8936; }
      }
    }
  }

  .reset-button {
    width: 100%;
    padding: 12px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      background: #2980b9;
    }
  }

  @media (max-width: 768px) {
    .verification-methods {
      grid-template-columns: 1fr;
    }
    
    .divider {
      margin: 20px 0;
    }
    
    .hash-form {
      flex-direction: column;
    }
    
    .detail-row {
      flex-direction: column;
      gap: 5px;
    }
  }
`;

function VerificationDiplome() {
  //const [scanResult, setScanResult] = useState(null);
  const [diplomeInfo, setDiplomeInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualHash, setManualHash] = useState('');
  const [scannerActive, setScannerActive] = useState(true);

  useEffect(() => {
    if (scannerActive) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      scanner.render(onScanSuccess, onScanError);

      function onScanSuccess(decodedText) {
        setScanResult(decodedText);
        scanner.clear();
        setScannerActive(false);
        verifierDiplomeHash(decodedText);
      }

      function onScanError(error) {
        console.warn(`Erreur de scan: ${error}`);
      }

      return () => {
        scanner.clear();
      };
    }
  }, [scannerActive]);

  const verifierDiplomeHash = async (hash) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/diplomes/${hash}`);
      if (!response.ok) {
        if (response.status === 404) {
          setDiplomeInfo({ error: "Diplôme non trouvé dans la base de données" });
        } else {
          throw new Error('Erreur lors de la vérification du diplôme');
        }
      } else {
        const diplome = await response.json();
        setDiplomeInfo(diplome);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      setDiplomeInfo({ error: "Erreur lors de la vérification du diplôme" });
    }
    setLoading(false);
  };

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (manualHash) {
      verifierDiplomeHash(manualHash);
    }
  };

  const resetVerification = () => {
    setDiplomeInfo(null);
    setScanResult(null);
    setManualHash('');
    setScannerActive(true);
  };

  return (
    <VerificationContainer>
      <div className="verification-container">
        <div className="verification-header">
          <FaSearch className="header-icon" />
          <h2>Vérification de Diplôme</h2>
        </div>

        {!diplomeInfo && (
          <>
            <div className="verification-methods">
              <div className="scanner-section">
                <h3><FaQrcode /> Scanner le QR Code</h3>
                <div id="reader"></div>
              </div>

              <div className="divider">OU</div>

              <div className="manual-section">
                <h3>Vérification Manuelle</h3>
                <form onSubmit={handleManualVerify} className="hash-form">
                  <input
                    type="text"
                    value={manualHash}
                    onChange={(e) => setManualHash(e.target.value)}
                    placeholder="Entrez le hash du diplôme"
                  />
                  <button type="submit" disabled={loading || !manualHash}>
                    Vérifier
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {loading && (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Vérification en cours...</p>
          </div>
        )}

        {diplomeInfo && (
          <div className={`result-container ${diplomeInfo.verifie ? 'valid' : 'invalid'}`}>
            <div className="result-header">
              {diplomeInfo.error ? (
                <>
                  <FaTimesCircle className="result-icon error" />
                  <h3>{diplomeInfo.error}</h3>
                </>
              ) : (
                <>
                  <FaCheckCircle className="result-icon success" />
                  <h3>Diplôme Vérifié</h3>
                </>
              )}
            </div>

            {!diplomeInfo.error && (
              <div className="diplome-details">
                <div className="detail-row">
                  <span>Titre:</span>
                  <span>{diplomeInfo.titre}</span>
                </div>
                <div className="detail-row">
                  <span>Étudiant:</span>
                  <span>{diplomeInfo.etudiant}</span>
                </div>
                <div className="detail-row">
                  <span>Institution:</span>
                  <span>{diplomeInfo.institution}</span>
                </div>
                <div className="detail-row">
                  <span>Date d'obtention:</span>
                  <span>{new Date(diplomeInfo.dateObtention).toLocaleDateString()}</span>
                </div>
                {diplomeInfo.specialite && (
                  <div className="detail-row">
                    <span>Spécialité:</span>
                    <span>{diplomeInfo.specialite}</span>
                  </div>
                )}
                {diplomeInfo.mention && (
                  <div className="detail-row">
                    <span>Mention:</span>
                    <span>{diplomeInfo.mention}</span>
                  </div>
                )}
                <div className="detail-row status">
                  <span>Statut:</span>
                  <span className="verified">✓ Diplôme Authentique</span>
                </div>
              </div>
            )}

            <button onClick={resetVerification} className="reset-button">
              Nouvelle Vérification
            </button>
          </div>
        )}
      </div>
    </VerificationContainer>
  );
}

export default VerificationDiplome; 
