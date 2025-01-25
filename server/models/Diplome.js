const mongoose = require('mongoose');

const DiplomeSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  titre: {
    type: String,
    required: true
  },
  etudiant: {
    type: String,
    required: true
  },
  numeroEtudiant: {
    type: String,
    required: true
  },
  institution: {
    type: String,
    required: true
  },
  specialite: String,
  mention: String,
  dateObtention: {
    type: Date,
    required: true
  },
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Diplome', DiplomeSchema); 