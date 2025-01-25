import React, { useState } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { useContract } from '../hooks/useContract';
import { QRCodeSVG } from 'qrcode.react';

function CreateDocument() {
  const { account } = useWeb3();
  const { createDocument } = useContract();
  const [documentData, setDocumentData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Créer un hash des données du document
      const dataString = JSON.stringify(documentData);
      const encoder = new TextEncoder();
      const data = encoder.encode(dataString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Créer le document sur la blockchain
      await createDocument(hashHex, documentData.title);
      setHash(hashHex);
      
    } catch (error) {
      console.error('Erreur lors de la création du document:', error);
      alert('Erreur lors de la création du document');
    }
    setLoading(false);
  };

  return (
    <div className="create-document">
      <h2>Créer un Nouveau Document</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={documentData.title}
            onChange={(e) => setDocumentData({...documentData, title: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={documentData.description}
            onChange={(e) => setDocumentData({...documentData, description: e.target.value})}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={documentData.date}
            onChange={(e) => setDocumentData({...documentData, date: e.target.value})}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Création en cours...' : 'Créer le Document'}
        </button>
      </form>

      {hash && (
        <div className="document-result">
          <h3>Document Créé!</h3>
          <p>Hash du document: {hash}</p>
          <div className="qr-code">
            <QRCodeSVG value={hash} size={256} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateDocument; 