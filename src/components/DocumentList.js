import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';

function DocumentList() {
  const { account, provider } = useWeb3();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      loadDocuments();
    }
  }, [account]);

  const loadDocuments = async () => {
    try {
      // TODO: Remplacer par l'appel au smart contract
      // const contract = new ethers.Contract(address, abi, provider);
      // const docs = await contract.getDocumentsByUser(account);
      
      // Simulation de données pour l'exemple
      const mockDocs = [
        {
          hash: '0x123...',
          title: 'Document 1',
          timestamp: Date.now(),
          verified: true
        },
        {
          hash: '0x456...',
          title: 'Document 2',
          timestamp: Date.now() - 86400000,
          verified: true
        }
      ];
      
      setDocuments(mockDocs);
    } catch (error) {
      console.error('Erreur lors du chargement des documents:', error);
    }
    setLoading(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="document-list">
      <h2>Mes Documents</h2>
      
      {loading ? (
        <p>Chargement des documents...</p>
      ) : documents.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Hash</th>
              <th>Date</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td>{doc.title}</td>
                <td>
                  <span className="hash">{doc.hash}</span>
                </td>
                <td>{formatDate(doc.timestamp)}</td>
                <td>
                  {doc.verified ? 
                    <span className="verified">✅ Vérifié</span> : 
                    <span className="pending">⏳ En attente</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun document trouvé</p>
      )}
    </div>
  );
}

export default DocumentList; 