const db = './credentials.js';
const utils = require('./hashUtils.js');


const mysql = require('mysql');

const connection = mysql.createConnection({
  // host     : 'fill_In',
  // port: 'fill_In',
  user: db.user,
  password: db.password,
  database: 'query_cats'
});

const addCat = (username, password, breed, birthdate, imageUrl, name, callback) => {
  let salt = utils.createRandom32String();
  let hash = utils.createHash(password, salt);

  const queryStr = `INSERT INTO accounts (username, password, breed, birthdate, imageUrl, name, salt) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(queryStr, [username, hash, breed, birthdate, imageUrl, name, salt], (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });

};


// var selectAll = function (callback) {
//   connection.query('SELECT * FROM items', function (err, results, fields) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

module.exports = { addCat };
