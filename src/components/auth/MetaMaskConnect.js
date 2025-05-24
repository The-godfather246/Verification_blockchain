import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';

const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.connected ? '#4CAF50' : '#4a90e2'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.connected ? '#45a049' : '#357abd'};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const WalletAddress = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  word-break: break-all;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const MetaMaskConnect = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const { user, updateUser } = useAuth();

  useEffect(() => {
    // Vérifier si MetaMask est installé
    const checkMetaMask = async () => {
      if (window.ethereum) {
        setIsMetaMaskInstalled(true);
        
        // Vérifier si déjà connecté
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            handleAccountsChanged(accounts);
          }
        } catch (err) {
          console.error('Erreur lors de la vérification des comptes:', err);
        }
      }
    };

    checkMetaMask();

    // Écouter les changements de compte
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // L'utilisateur s'est déconnecté de MetaMask
      if (user) {
        const updatedUser = { ...user, walletAddress: null };
        updateUser(updatedUser);
        
        try {
          // Mettre à jour l'adresse wallet dans la base de données
          await fetch('http://localhost:5000/api/auth/update-wallet', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ walletAddress: null })
          });
        } catch (err) {
          console.error('Erreur lors de la mise à jour de l\'adresse wallet:', err);
        }
      }
    } else {
      // L'utilisateur a changé de compte ou s'est connecté
      const walletAddress = accounts[0];
      if (user) {
        const updatedUser = { ...user, walletAddress };
        updateUser(updatedUser);
        
        try {
          // Mettre à jour l'adresse wallet dans la base de données
          await fetch('http://localhost:5000/api/auth/update-wallet', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ walletAddress })
          });
        } catch (err) {
          console.error('Erreur lors de la mise à jour de l\'adresse wallet:', err);
        }
      }
    }
  };

  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Demander la connexion à MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      handleAccountsChanged(accounts);
    } catch (err) {
      setError('Erreur lors de la connexion à MetaMask');
      console.error('Erreur de connexion MetaMask:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      // Note: MetaMask ne permet pas de déconnecter programmatiquement
      // Nous pouvons seulement mettre à jour notre état local
      if (user) {
        const updatedUser = { ...user, walletAddress: null };
        updateUser(updatedUser);
        
        await fetch('http://localhost:5000/api/auth/update-wallet', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ walletAddress: null })
        });
      }
    } catch (err) {
      console.error('Erreur lors de la déconnexion du wallet:', err);
    }
  };

  return (
    <div>
      <ConnectButton
        onClick={user?.walletAddress ? disconnectWallet : connectWallet}
        connected={!!user?.walletAddress}
        disabled={isConnecting}
      >
        {isConnecting ? (
          'Connexion en cours...'
        ) : user?.walletAddress ? (
          'Déconnecter Wallet'
        ) : isMetaMaskInstalled ? (
          'Connecter MetaMask'
        ) : (
          'Installer MetaMask'
        )}
      </ConnectButton>

      {user?.walletAddress && (
        <WalletAddress>
          Wallet: {user.walletAddress}
        </WalletAddress>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default MetaMaskConnect; 