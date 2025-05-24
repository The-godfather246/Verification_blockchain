---

# 🎓 Vérification Blockchain  
Documentation du Projet Blockchain Diplômes

---

## Table des Matières
1. [Présentation du projet](#présentation)
2. [Architecture technique](#architecture)
3. [Installation](#installation)
4. [Mode d'emploi](#mode-demploi)
5. [Documentation de l'API](#documentation-de-lapi)
6. [Sécurité](#sécurité)
7. [Support](#support)
8. [Maintenance](#maintenance)
9. [Contribution](#contribution)

## Présentation
Ce projet permet la création, la vérification et la gestion de diplômes numériques utilisant la technologie blockchain. Il offre une interface utilisateur intuitive pour :
- Créer des diplômes numériques
- Vérifier l'authenticité des diplômes via QR Code
- Consulter la liste des diplômes émis

---

## 🏗️ Architecture  

### Frontend (React)
```
/src/components/    : Composants React  
/src/services/      : Services et API  
/src/context/       : Contextes React (Web3)  
```

### Backend (Node.js + Express)
```
/server/models/     : Modèles PostgreSQL  
/server/routes/     : Routes API  
/server/server.js   : Point d'entrée du serveur  
```

### Blockchain (Hardhat + Solidity + Sepolia)
```
/contracts/         : Smart contracts Solidity  
/scripts/           : Scripts de déploiement  
/src/artifacts/     : ABI des contrats  
hardhat.config.js   : Config Hardhat  
```

### Base de données
- PostgreSQL : Stockage des diplômes

---

## 🛠️ Installation  

### Prérequis  
- Node.js (v14+)  
- PostgreSQL  
- Git  

### Étapes  
#### 1️⃣ Cloner le projet  
```bash
git clone https://github.com/The-godfather246/Verification_blockchain.git  
cd blockchain-diplomes
```

#### 2️⃣ Installer les dépendances frontend  
```bash
npm install
```

#### 3️⃣ Installer les dépendances backend  
```bash
cd server
npm install
```

4. Configurer l'environnement
   - Dans le dossier `server`, créer un fichier `.env` :
   ```plaintext
   DATABASE_URL=postgres://votre_utilisateur:votre_mot_de_passe@localhost:5432/blockchain_diplomes
   PORT=5000
   ```

5. Démarrer PostgreSQL
   - Windows : Vérifier que le service "PostgreSQL" est en cours d'exécution
   - Linux/Mac : `sudo service postgresql start`

#### 6️⃣ Démarrer le serveur
```bash
cd server
npm run dev
```

7. Démarrer l'application React (dans un nouveau terminal)
   ```bash
   npm start
   ```

---

## 📦 Smart Contracts & Blockchain  

### Compilation  
```bash
npx hardhat compile
```

### Déploiement Sepolia  
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Vérification Etherscan  
```bash
npx hardhat verify --network sepolia adresse_du_contrat
```

### Structure Blockchain  
- `DocumentManager.sol` : Gestion des utilisateurs et documents  
- `scripts/deploy.js` : Script déploiement + ajout utilisateurs test  
- `.env` : Variables clés Sepolia et Etherscan  

---

## 📋 Mode d'emploi  

### Création d'un diplôme  
1. Aller dans "Création"  
2. Remplir :
   - Titre  
   - Nom étudiant  
   - Numéro étudiant  
   - Institution  
   - Date d'obtention  
   - Spécialité / Mention (optionnel)  
3. Cliquer sur "Créer le Diplôme"  
4. Un QR Code + enregistrement blockchain sont générés  

### Vérification  
1. Aller dans "Vérification"  
2. Scanner un QR code **ou** entrer le hash  
3. Voir les infos si valide  

### Consultation  
1. Aller dans "Liste"  
2. Filtrer par :
   - Nom étudiant  
   - Institution  
   - Date  
3. Cliquer pour voir les détails  

---

## 📖 Documentation de l'API  

### Endpoints  

**Création de diplôme**
```
POST /api/diplomes
```
Body:
```json
{
  "hash": "string",
  "titre": "string",
  "etudiant": "string",
  "institution": "string",
  "dateObtention": "date",
  "specialite": "string",
  "mention": "string"
}
```

**Vérification**
```
GET /api/diplomes/:hash
```

**Liste**
```
GET /api/diplomes
```

---

## 🔒 Sécurité  
- Hash uniques  
- Vérification via blockchain  
- Stockage sécurisé PostgreSQL  

---

## 🛠️ Support  
- Vérifier PostgreSQL  
- Logs serveur  
- Console navigateur  

---

## 🛡️ Maintenance  
- Sauvegarde régulière  
- Mise à jour npm  
- Surveillance logs  

---

## Contribution
1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
  
