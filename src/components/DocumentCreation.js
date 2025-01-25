import React, { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { QRCodeSVG } from 'qrcode.react';
import { useContract } from '../hooks/useContract';

function DocumentCreation() {
    const { contract } = useWeb3();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [qrCode, setQrCode] = useState('');
    const [status, setStatus] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setStatus('');
        setQrCode('');
    };

    const createDocument = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        setStatus('Traitement du document...');

        try {
            // Calculer le hash du document
            const buffer = await file.arrayBuffer();
            const hashArray = new Uint8Array(await crypto.subtle.digest('SHA-256', buffer));
            const hashHex = Array.from(hashArray)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            // Générer l'URL du QR code
            const qrData = `${window.location.origin}/verify/${hashHex}`;
            setQrCode(qrData);

            // Enregistrer dans la blockchain
            const tx = await contract.createDocument(hashHex, qrData);
            setStatus('Transaction en cours...');
            
            await tx.wait();
            setStatus('Document enregistré avec succès!');
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('Erreur: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="document-creation">
            <h2>Créer un nouveau document</h2>
            
            <form onSubmit={createDocument} className="creation-form">
                <div className="file-input-container">
                    <label htmlFor="document">Sélectionner un document</label>
                    <input
                        type="file"
                        id="document"
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                </div>

                {file && (
                    <div className="file-info">
                        <p>Nom du fichier: {file.name}</p>
                        <p>Taille: {(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}

                <button type="submit" disabled={!file || loading}>
                    {loading ? 'Traitement...' : 'Créer le document'}
                </button>

                {status && (
                    <div className={`status-message ${status.includes('Erreur') ? 'error' : 'success'}`}>
                        {status}
                    </div>
                )}

                {qrCode && (
                    <div className="qr-code-container">
                        <h3>Code QR généré</h3>
                        <QRCodeSVG value={qrCode} size={200} />
                        <button onClick={() => {
                            const link = document.createElement('a');
                            link.download = 'qr-code.png';
                            link.href = document.querySelector('canvas').toDataURL();
                            link.click();
                        }}>
                            Télécharger le QR Code
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default DocumentCreation; 