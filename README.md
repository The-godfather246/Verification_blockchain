---

# 🎓 Vérification Blockchain  
Documentation du Projet Blockchain Diplômes

---

## 📑 Table des Matières  
- Présentation du projet  
- Architecture technique  
- Installation  
- Mode d'emploi  
- Smart Contracts & Blockchain  
- Documentation de l'API  
- Sécurité  
- Support  
- Maintenance  
- Contribution  

---

## 📖 Présentation  
Ce projet permet la création, la vérification et la gestion de diplômes numériques utilisant la technologie blockchain. Il offre une interface utilisateur intuitive pour :  
- Créer des diplômes numériques  
- Vérifier l'authenticité via QR Code et blockchain  
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

#### 4️⃣ Configurer l'environnement  
**Dans `/server/config.js` :**
```config.js
const sequelize = new Sequelize('blockchain_diplomes', 'postgres', 'votre_mot_de_passe', {
    host: 'localhost',
    dialect: 'postgres',
}); 
```

**Dans la racine du projet `/` :**
```env
PRIVATE_KEY=ta_clé_privée
SEPOLIA_URL=https://sepolia.infura.io/v3/ton_project_id
ETHERSCAN_API_KEY=ta_clé_etherscan
```

#### 5️⃣ Démarrer PostgreSQL  
- **Windows :** Vérifier le service "PostgreSQL"  
- **Linux/Mac :**  
```bash
sudo service postgresql start
```

#### 6️⃣ Démarrer le serveur
```bash
cd server
npm run dev
```

#### 7️⃣ Démarrer le frontend React
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

## 🤝 Contribution  
1. Fork  
2. Crée une branche  
```bash
git checkout -b feature/AmazingFeature
```
3. Commit tes changements  
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push  
```bash
git push origin feature/AmazingFeature
```
5. Ouvre une Pull Request  

