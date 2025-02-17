const { Sequelize } = require('sequelize');

// Créez une instance Sequelize
const sequelize = new Sequelize('blockchain_diplomes', 'postgres', '4606', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize; 