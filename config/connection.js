const { connect, connection } = require('mongoose');

connect('mongodb://localhost/mygroceryDB');

module.exports = connection;