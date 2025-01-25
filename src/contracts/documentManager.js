export const DOCUMENT_MANAGER_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";

export const DOCUMENT_MANAGER_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "hash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "DocumentCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "hash",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "verifier",
        "type": "address"
      }
    ],
    "name": "DocumentVerified",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      }
    ],
    "name": "createDocument",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... autres fonctions du contrat
]; 