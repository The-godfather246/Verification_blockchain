import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { useParams, useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useContract } from '../hooks/useContract';

function DocumentVerification() {
    const { contract } = useWeb3();
    const { hash } = useParams();
    const navigate = useNavigate();
    
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null);
    const [scannerOpen, setScannerOpen] = useState(false);
    const [status, setStatus] = useState('');
    const [result, setResult] = useState('');

    // Vérifier si un hash est fourni dans l'URL
    useEffect(() => {
        if (hash) {
            verifyHash(hash);
        }
    }, [hash]);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setVerificationResult(null);
        setStatus('');
        
        if (selectedFile) {
            await verifyDocument(selectedFile);
        }
    };

    const verifyDocument = async (documentFile) => {
        setLoading(true);
        setStatus('Calcul du hash...');

        try {
            // Calculer le hash du document
            const buffer = await documentFile.arrayBuffer();
            const hashArray = new Uint8Array(await crypto.subtle.digest('SHA-256', buffer));
            const hashHex = Array.from(hashArray)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            await verifyHash(hashHex);
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('Erreur lors de la vérification: ' + error.message);
            setVerificationResult(null);
        } finally {
            setLoading(false);
        }
    };

    const verifyHash = async (hashToVerify) => {
        setLoading(true);
        setStatus('Vérification dans la blockchain...');

        try {
            const result = await contract.verifyDocument(hashToVerify);
            const document = await contract.documents(hashToVerify);
            
            setVerificationResult({
                isValid: result,
                creator: document.creator,
                timestamp: new Date(document.timestamp * 1000).toLocaleString(),
                hash: hashToVerify
            });
            
            setStatus(result ? 'Document vérifié et valide' : 'Document invalide ou révoqué');
        } catch (error) {
            console.error('Erreur:', error);
            setStatus('Erreur lors de la vérification: ' + error.message);
            setVerificationResult(null);
        } finally {
            setLoading(false);
        }
    };

    const handleQrScan = (data) => {
        if (data) {
            setScannerOpen(false);
            const hash = data.split('/').pop();
            navigate(`/verify/${hash}`);
        }
    };

    const handleScanError = (error) => {
        console.error(error);
        setStatus('Erreur lors du scan du QR code');
    };

    React.useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scanner.render(success, error);

        function success(result) {
            setResult(result);
            scanner.clear();
        }

        function error(err) {
            console.error(err);
        }

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <div className="document-verification">
            <h2>Vérifier un document</h2>
            
            <div className="verification-methods">
                <div className="method-card">
                    <h3>Par fichier</h3>
                    <div className="file-input-container">
                        <label htmlFor="document">Sélectionner le document à vérifier</label>
                        <input
                            type="file"
                            id="document"
                            onChange={handleFileChange}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="method-card">
                    <h3>Par QR Code</h3>
                    <button 
                        onClick={() => setScannerOpen(!scannerOpen)}
                        disabled={loading}
                    >
                        {scannerOpen ? 'Fermer le scanner' : 'Scanner un QR Code'}
                    </button>
                    
                    {scannerOpen && (
                        <div className="qr-scanner">
                            <div id="reader"></div>
                        </div>
                    )}
                </div>
            </div>

            {status && (
                <div className={`status-message ${status.includes('Erreur') ? 'error' : 
                    status.includes('valide') ? 'success' : 'info'}`}>
                    {status}
                </div>
            )}

            {verificationResult && (
                <div className="verification-result">
                    <h3>Résultat de la vérification</h3>
                    <div className="result-details">
                        <p>
                            <strong>Statut:</strong> 
                            <span className={verificationResult.isValid ? 'valid' : 'invalid'}>
                                {verificationResult.isValid ? 'Valide' : 'Invalide'}
                            </span>
                        </p>
                        <p><strong>Créé par:</strong> {verificationResult.creator}</p>
                        <p><strong>Date de création:</strong> {verificationResult.timestamp}</p>
                        <p><strong>Hash:</strong> {verificationResult.hash}</p>
                    </div>
                </div>
            )}

            {result && (
                <div className="verification-result">
                    <h3>Résultat du scan QR Code</h3>
                    <div className="result-details">
                        <p>
                            <strong>Résultat:</strong> 
                            {result}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DocumentVerification; 