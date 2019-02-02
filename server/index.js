const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const db = require('../database/index.js');
const util = require('../database/hashUtils.js');

const app = express();

app.use(cookieParser());

// set a cookie
app.use(function (req, res, next) {
  // check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 1000 * 60 * 20, httpOnly: true });
    console.log('cookie created successfully');
  }
  else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  }
  next();
});

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/cat/register', (req, res) => {
  let { username, password, breed, birthdate, imageUrl, name, weight } = req.body;
  const setToNullIfEmpty = val => val === '' ? null : val;
  // to refactor: could avoid repeating and call on all properties in req.body
  imageUrl = setToNullIfEmpty(imageUrl);
  birthdate = setToNullIfEmpty(birthdate);
  breed = setToNullIfEmpty(breed);
  
  db.addCat(username, password, breed, birthdate, imageUrl, name, weight, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(results);
    }
  })
});

app.put('/cat/login', (req, res) => {
  let {username, password} = req.body;

  db.getCatByUsername(username, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      let storedPassword = results[0].password;
      let salt = results[0].salt;
      let id = results[0].id;

      console.log('salt:', salt);
      console.log('password:', password)
      console.log(util.compareHash(password, storedPassword, salt));

      if (util.compareHash(password, storedPassword, salt)) {
        // if they are a match, 
        // update the addedAt property to current timestamp
        db.updateLastSeenAt(id, (err, results) => {
          if (err) {
            console.log(error);
            res.status(500).send('error updating lastSeenAt');
          } else {
            // successfully updated timestamp
            res.status(200).send('lastSeenAt updated');
          }
        })
        // then send back success code
      } else {
        // if not a match, send back err
        res.status(400).send('wrong password');
      }
    }
  });

});

// app.get('/items', function (req, res) {
//   items.selectAll(function (err, data) {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

app.listen(3001, function () {
  console.log('listening on port 3001!');
});
