# Vérification Blockchain

# Documentation du Projet Blockchain Diplômes

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

## Architecture

### Frontend (React)
- `/src/components/` : Composants React
- `/src/services/` : Services et API
- `/src/context/` : Contextes React (Web3)

### Backend (Node.js + Express)
- `/server/models/` : Modèles PostgreSQL
- `/server/routes/` : Routes API
- `/server/server.js` : Point d'entrée du serveur

### Base de données
- PostgreSQL : Stockage des diplômes

## Installation

### Prérequis
- Node.js (v14+)
- PostgreSQL
- Git

### Étapes d'installation

1. Cloner le repository
   ```bash
   git clone https://github.com/The-godfather246/Verification_blockchain.git
   cd blockchain-diplomes
   ```

2. Installer les dépendances frontend
   ```bash
   npm install
   ```

3. Installer les dépendances backend
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

6. Démarrer le serveur
   ```bash
   cd server
   npm run dev
   ```

7. Démarrer l'application React (dans un nouveau terminal)
   ```bash
   npm start
   ```

## Mode d'emploi

### Création d'un diplôme
1. Accédez à l'onglet "Création"
2. Remplissez le formulaire avec :
   - Titre du diplôme
   - Nom de l'étudiant
   - Numéro étudiant
   - Institution
   - Date d'obtention
   - Spécialité (optionnel)
   - Mention (optionnel)
3. Cliquez sur "Créer le Diplôme"
4. Un QR Code sera généré

### Vérification d'un diplôme
1. Accédez à l'onglet "Vérification"
2. Deux options :
   - Scanner le QR Code avec la caméra
   - Entrer manuellement le hash du diplôme
3. Les informations du diplôme s'afficheront si authentique

### Consultation des diplômes
1. Accédez à l'onglet "Liste"
2. Utilisez les filtres pour rechercher :
   - Par nom d'étudiant
   - Par institution
   - Par date
3. Cliquez sur un diplôme pour voir les détails

## Documentation de l'API

### Endpoints

#### Création de diplôme
```
POST /api/diplomes
```
**Body**:
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

#### Vérification de diplôme
```
GET /api/diplomes/:hash
```

#### Liste des diplômes
```
GET /api/diplomes
```

## Sécurité
- Les hash sont générés de manière unique
- Vérification en temps réel
- Stockage sécurisé dans PostgreSQL

## Support
Pour toute question ou problème :
1. Vérifiez que PostgreSQL est en cours d'exécution
2. Vérifiez les logs du serveur
3. Vérifiez la console du navigateur (F12)

## Maintenance
- Sauvegardez régulièrement la base de données
- Mettez à jour les dépendances npm
- Surveillez les logs serveur pour les erreurs

## Contribution
1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
  
