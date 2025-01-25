import React, { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useContract } from '../hooks/useContract';

function VerifyDocument() {
  const { getDocument, verifyDocument } = useContract();
  const [scanResult, setScanResult] = useState(null);
  const [documentInfo, setDocumentInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualHash, setManualHash] = useState('');

  useEffect(() => {
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
      checkDocument(decodedText);
    }

    function onScanError(error) {
      console.warn(`Erreur de scan: ${error}`);
    }

    return () => {
      scanner.clear();
    };
  }, []);

  const checkDocument = async (hash) => {
    setLoading(true);
    try {
      const info = await getDocument(hash);
      setDocumentInfo({
        ...info,
        hash
      });
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      setDocumentInfo({ error: "Document non trouvé ou erreur de vérification" });
    }
    setLoading(false);
  };

  const handleManualVerify = async (e) => {
    e.preventDefault();
    if (manualHash) {
      await checkDocument(manualHash);
    }
  };

  const handleVerifyDocument = async () => {
    setLoading(true);
    try {
      await verifyDocument(documentInfo.hash);
      // Recharger les informations du document
      await checkDocument(documentInfo.hash);
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      alert('Erreur lors de la validation du document');
    }
    setLoading(false);
  };

  return (
    <div className="verify-document">
      <h2>Vérifier un Document</h2>
      
      <div className="scanner-section">
        <h3>Scanner un QR Code</h3>
        <div id="reader"></div>
      </div>

      <div className="manual-section">
        <h3>Ou entrer le hash manuellement</h3>
        <form onSubmit={handleManualVerify}>
          <input
            type="text"
            value={manualHash}
            onChange={(e) => setManualHash(e.target.value)}
            placeholder="Entrez le hash du document"
          />
          <button type="submit" disabled={loading}>Vérifier</button>
        </form>
      </div>

      {loading && <p>Chargement...</p>}

      {documentInfo && (
        <div className={`result-section ${documentInfo.verified ? 'valid-document' : 'invalid-document'}`}>
          <h3>Résultat de la vérification</h3>
          {documentInfo.error ? (
            <p className="error">{documentInfo.error}</p>
          ) : (
            <>
              <p>Hash: {documentInfo.hash}</p>
              <p>Titre: {documentInfo.title}</p>
              <p>Créateur: {documentInfo.creator}</p>
              <p>Date: {new Date(documentInfo.timestamp * 1000).toLocaleString()}</p>
              <p>Statut: {documentInfo.verified ? '✅ Vérifié' : '⏳ En attente de vérification'}</p>
              
              {!documentInfo.verified && (
                <button 
                  onClick={handleVerifyDocument}
                  disabled={loading}
                >
                  Valider ce document
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VerifyDocument; 