import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function DocumentManagement({ contract }) {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const invalidateDocument = async (hash) => {
        try {
            const tx = await contract.invalidateDocument(hash);
            await tx.wait();
            alert('Document invalidé avec succès!');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'invalidation du document');
        }
    };

    // Écouter les événements de création de documents
    useEffect(() => {
        const filter = contract.filters.DocumentCreated();
        contract.on(filter, (hash, creator) => {
            // Mettre à jour la liste des documents
            setDocuments(prev => [...prev, { hash, creator }]);
        });

        return () => {
            contract.removeAllListeners();
        };
    }, [contract]);

    return (
        <div className="document-management">
            <h2>Gestion des documents</h2>
            
            <div className="documents-list">
                <h3>Documents enregistrés</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Hash</th>
                            <th>Créateur</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.hash}>
                                <td>{doc.hash}</td>
                                <td>{doc.creator}</td>
                                <td>
                                    <button onClick={() => invalidateDocument(doc.hash)}>
                                        Invalider
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DocumentManagement; 