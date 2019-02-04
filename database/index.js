const db = './credentials.js';
const utils = require('./hashUtils.js');


const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mydbinstance.cnhrosb7vmjs.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'marymatt504',
  password: 'maymay823',
  database: 'query_cats'
});

const addCat = (username, password, breed, birthdate, imageUrl, name, weight, callback) => {
  let salt = utils.createRandom32String();
  let hash = utils.createHash(password, salt);

  const queryStr = `INSERT INTO cats (username, password, breed, birthdate, imageUrl, name, salt, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(queryStr, [username, hash, breed, birthdate, imageUrl, name, salt, weight], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};


const getCatByUsername = (username, callback) => {
  const queryStr = `SELECT * FROM cats WHERE username = ?`;
  connection.query(queryStr, [username], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const updateLastSeenAt = (id, callback) => {
  const queryStr = `UPDATE cats SET lastSeenAt = NOW() where id = ?;`;
  connection.query(queryStr, [id], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getRandomCat = callback => {
  const queryStr = 'SELECT * FROM cats ORDER BY RAND() LIMIT 1';
  connection.query(queryStr, [], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const createSession = (user_id, token, callback) => {
  const queryStr = 'INSERT INTO sessions (user_id, token) VALUES (?, ?)';
  connection.query(queryStr, [user_id, token], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const findSession = (token, callback) => {
  const queryStr = 'SELECT * FROM sessions WHERE token = ?';
  connection.query(queryStr, [token], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getUserId = callback => {
  const queryStr = 'SELECT LAST_INSERT_ID()';
  connection.query(queryStr, [], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const searchCats = (username, name, id, callback) => {
  const queryStr = 'SELECT * from cats WHERE (username = ?) OR (name = ?) OR (id = ?);';
  connection.query(queryStr, [username, name, id], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};



module.exports = { addCat, getCatByUsername, updateLastSeenAt, getRandomCat, createSession, findSession, getUserId, searchCats };
