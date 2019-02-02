const db = './credentials.js';
const utils = require('./hashUtils.js');


const mysql = require('mysql');

const connection = mysql.createConnection({
  // host     : 'fill_In',
  // port: 'fill_In',
  user: 'root',
  // password: db.password,
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
}


// var selectAll = function (callback) {
//   connection.query('SELECT * FROM items', function (err, results, fields) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

module.exports = { addCat, getCatByUsername, updateLastSeenAt };
