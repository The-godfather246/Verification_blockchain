import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import { DOCUMENT_MANAGER_ADDRESS, DOCUMENT_MANAGER_ABI } from '../contracts/documentManager';
//import DiplomeABI from '../contracts/DiplomeABI.json'; // À créer plus tard

export function useContract() {
  const { web3, account } = useWeb3();
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (web3) {
      const signer = web3.getSigner();
      setSigner(signer);
      const contractInstance = new ethers.Contract(
        DOCUMENT_MANAGER_ADDRESS,
        DOCUMENT_MANAGER_ABI,
        signer
      );
      setContract(contractInstance);
    }
  }, [web3]);

  const createDocument = async (hash, title) => {
    if (!contract) throw new Error("Contract not initialized");
    try {
      const tx = await contract.createDocument(hash, title);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  };

  const verifyDocument = async (hash) => {
    if (!contract) throw new Error("Contract not initialized");
    try {
      const tx = await contract.verifyDocument(hash);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error verifying document:', error);
      throw error;
    }
  };

  const getDocument = async (hash) => {
    if (!contract) throw new Error("Contract not initialized");
    try {
      const doc = await contract.getDocument(hash);
      return {
        title: doc[0],
        creator: doc[1],
        timestamp: doc[2].toNumber(),
        verified: doc[3]
      };
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  };

  const getUserDocuments = async (address) => {
    if (!contract) throw new Error("Contract not initialized");
    try {
      const hashes = await contract.getUserDocuments(address);
      const documents = await Promise.all(
        hashes.map(async (hash) => {
          const doc = await getDocument(hash);
          return { ...doc, hash };
        })
      );
      return documents;
    } catch (error) {
      console.error('Error getting user documents:', error);
      throw error;
    }
  };

  const creerDiplome = async (hash, titre, etudiant, institution) => {
    console.log('Création diplôme:', { hash, titre, etudiant, institution });
    return true;
  };

  const verifierDiplome = async (hash) => {
    return {
      titre: "Diplôme Test",
      institution: "École Test",
      etudiant: "John Doe",
      dateDelivrance: new Date(),
      verifie: true
    };
  };

  const getDiplomes = async () => {
    return [
      {
        hash: "0x123...",
        titre: "Master en Informatique",
        etudiant: "John Doe",
        institution: "Université Test",
        dateDelivrance: new Date(),
        verifie: true
      }
    ];
  };

  return {
    contract,
    createDocument,
    verifyDocument,
    getDocument,
    getUserDocuments,
    creerDiplome,
    verifierDiplome,
    getDiplomes
  };
} 
