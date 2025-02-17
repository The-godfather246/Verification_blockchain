const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Diplome = sequelize.define('Diplome', {
    hash: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    etudiant: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    institution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateObtention: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    specialite: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    mention: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateCreation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Diplome; 