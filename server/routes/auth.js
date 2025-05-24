const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth, checkRole } = require('../middleware/auth');
const { Op } = require('sequelize');

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, walletAddress } = req.body;
    
    const user = await User.create({
      username,
      email,
      password,
      walletAddress,
      role: 'NONE'
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress
      },
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.validatePassword(password))) {
      throw new Error('Identifiants invalides');
    }

    if (!user.isActive) {
      throw new Error('Compte désactivé');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    });

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress
      },
      token
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Obtenir le profil de l'utilisateur
router.get('/profile', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      walletAddress: req.user.walletAddress
    }
  });
});

// Mettre à jour le rôle d'un utilisateur (Admin uniquement)
router.patch('/users/:id/role', auth, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    user.role = role;
    await user.save();

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Désactiver un utilisateur (Admin uniquement)
router.patch('/users/:id/deactivate', auth, checkRole(['ADMIN']), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: 'Utilisateur désactivé avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Mettre à jour l'adresse wallet
router.patch('/update-wallet', auth, async (req, res) => {
  try {
    const { walletAddress } = req.body;
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'adresse wallet est déjà utilisée par un autre utilisateur
    if (walletAddress) {
      const existingUser = await User.findOne({
        where: {
          walletAddress,
          id: { [Op.ne]: user.id }
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Cette adresse wallet est déjà associée à un autre compte' });
      }
    }

    user.walletAddress = walletAddress;
    await user.save();

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        walletAddress: user.walletAddress
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users', auth, checkRole(['ADMIN']), async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role', 'walletAddress', 'isActive']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 