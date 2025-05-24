require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Diplome = require('./models/Diplome');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Modèles synchronisés avec la base de données.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Routes
app.post('/api/diplomes', async (req, res) => {
    try {
        const { hash, titre, etudiant, institution, dateObtention, specialite, mention } = req.body;
        if (!hash || !titre || !etudiant || !institution || !dateObtention) {
            return res.status(400).json({ message: "Tous les champs requis doivent être remplis." });
        }
        const diplome = await Diplome.create({ hash, titre, etudiant, institution, dateObtention, specialite, mention });
        res.status(201).json(diplome);
    } catch (error) {
        console.error('Erreur lors de la création du diplôme:', error);
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/diplomes/:hash', async (req, res) => {
    try {
        const diplome = await Diplome.findByPk(req.params.hash);
        if (diplome) {
            res.json(diplome);
        } else {
            res.status(404).json({ message: 'Diplôme non trouvé' });
        }
    } catch (error) {
        console.error('Erreur lors de la recherche du diplôme:', error);
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/diplomes', async (req, res) => {
    try {
        const diplomes = await Diplome.findAll();
        res.json(diplomes);
    } catch (error) {
        console.error('Erreur lors de la récupération des diplômes:', error);
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 