DROP DATABASE IF EXISTS query_cats;

CREATE DATABASE query_cats;

USE query_cats;

CREATE TABLE cats (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  password VARCHAR(64) NOT NULL,
  username VARCHAR(32) NOT NULL,
  salt VARCHAR(64),
  addedAt TIMESTAMP DEFAULT NOW(),
  breed VARCHAR(64),
  birthdate DATE,
  imageUrl VARCHAR(300),
  lastSeenAt TIMESTAMP DEFAULT NOW(),
  name VARCHAR(32) NOT NULL,
  weight FLOAT NOT NULL
);

-- CREATE TABLE sessions (
--   session_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   cat_id INT NOT NULL FOREIGN KEY(cats);
-- );
