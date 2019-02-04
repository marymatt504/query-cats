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
      db.getUserId((err, results) => {
        if (err) {
          console.log('couldnt get userId');
          res.status(500).send(err);
        } else {
          let user_id = results[0]['LAST_INSERT_ID()'];
          let sessionToken = req.cookies.cookieName;
          console.log(sessionToken);
          db.createSession(user_id, sessionToken, (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).send('failed to create session record');
            } else {
              res.status(201).send(results);
            }
          });
        }
      })
    }
  })
});

app.put('/cat/login', (req, res) => {
  let {username, password} = req.body;
  let sessionToken = req.cookies.cookieName;

  // could set up differently... if token is in the session db, don't need to check pw

  db.getCatByUsername(username, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('no such username');
    } else {
      let storedPassword = results[0].password;
      let salt = results[0].salt;
      let id = results[0].id;

      if (util.compareHash(password, storedPassword, salt)) {
        db.updateLastSeenAt(id, (err, results) => {
          if (err) {
            console.log(error);
            res.status(500).send('error updating lastSeenAt');
          } else {
            // if sessionToken not already in session table, shoudl add it
            db.findSession(sessionToken, (err, results) => {
              if (err) {
                res.status(500).send('failed on session lookup');
              } else {
                if (!results.length) {
                  db.createSession(id, sessionToken, (err, results) => {
                    if (err) {
                      res.status(500).send('failed creating session');
                    } else {
                      res.status(200).send();
                    }
                  });
                }
                // if session token alreayd there, still need to send back resposne
                res.status(200).send();
              }
            });
            //res.status(200).send('lastSeenAt updated');
          }
        })
      } else {
        res.status(400).send('wrong password');
      }
    }
  });
});

const isAuthenticated = (req, res, next) => {
  let token = req.cookies.cookieName;
  db.findSession(token, (err, results) => {
    // if does not return a session, redirect to homepage for login
    if (!results.length) {
      
      res.status(401).redirect('/');
    } else {
      return next();
    }
  });
}

app.get('/cats/:username/:name/:id', (req, res) => {
  let {username, name, id} = req.params;
  
  db.searchCats(username, name, id, (err, data) => {
    if (err) {
      res.status(500).send('invalid search criteria');
    } else {
      res.json(data);
    }
  });
});

app.get('/cats/random', isAuthenticated, (req, res) => {
  db.getRandomCat((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3001, function () {
  console.log('listening on port 3001!');
});
