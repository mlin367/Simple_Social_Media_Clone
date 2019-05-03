const Sequelize = require('sequelize');

const connection = new Sequelize('forum', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

connection
  .authenticate()
  .then(() => console.log('Connected to psql database'))
  .catch(err => console.error('Unable to connect to database: ', err));

module.exports = connection;