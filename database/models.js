const Sequelize = require('sequelize');
const connection = require('./');

const User = connection.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(25),
    allowNull: false,
    unique: true
  },
  hash_password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: false });

const Thread = connection.define('thread', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true    
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  comment_count: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: false
});

const Comment = connection.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true    
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: false
});

User.hasMany(Comment);
User.hasMany(Thread);
Thread.hasMany(Comment);

connection
  .sync( {force: false} )
  .then(() => {
    console.log('Models synced with database');
  })
  .catch(err => {
    console.error('Sync failed: ', err);
  });

module.exports = {
  User,
  Thread,
  Comment
};