const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Diplome = require('./models/Diplome');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/blockchain_diplomes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.post('/api/diplomes', async (req, res) => {
  try {
    console.log('Création d\'un nouveau diplôme:', req.body); // Pour le débogage
    const diplome = new Diplome(req.body);
    await diplome.save();
    console.log('Diplôme créé avec succès:', diplome); // Pour le débogage
    res.status(201).json(diplome);
  } catch (error) {
    console.error('Erreur lors de la création du diplôme:', error);
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/diplomes/:hash', async (req, res) => {
  try {
    const diplome = await Diplome.findOne({ hash: req.params.hash });
    if (diplome) {
      res.json(diplome);
    } else {
      res.status(404).json({ message: 'Diplôme non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/diplomes', async (req, res) => {
  try {
    const diplomes = await Diplome.find().sort({ dateCreation: -1 });
    console.log(`${diplomes.length} diplômes trouvés`); // Pour le débogage
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