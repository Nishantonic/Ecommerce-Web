const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config({ path: './.env' });
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded!' : 'Missing!');  // Add this line
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync('./ca.pem'),
      rejectUnauthorized: true,
    },
  },
  logging: false,
});

module.exports = sequelize;
