const connection = require('../sql/connection');

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

let isAdmin = function(req, res, next) {
  if (req.isAdmin) {
    next();
  } else {
    res.sendStatus(401).send("Unauthorized");
  }
};

let isTeacher = function(req, res, next) {
  if (req.isTeacher) {
    next();
  } else {
    res.sendStatus(401).send("Unauthorized");
  }
};

let isStudent = function(req, res, next) {
  if (req.isStudent) {
    next();
  } else {
    res.sendStatus(401).send("Unauthorized");
  }
};

let checkJwt = function(req, res, next) {
  console.log("Processing JWT authentication check");

  let token;
  if (req.headers.authorization) {
    let bearer = req.headers.authorization.split(' ');
    token = bearer[1];
  } else {
    token = null;
  }

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, jwtSecret, function(err, decoded){
    if (err) {
      console.log("Did not verify jwt ", err);
      return res.status(401).send("Unauthorized!");
    }

    console.log(decoded);
    req.email = decoded.email;
    if (decoded.role == 'admin') {
      req.isAdmin = 'admin';
    } else if (decoded.role == 'teacher') {
      req.isTeacher = 'teacher';
    } else if (decoded.role == 'student') {
      req.isStudent = 'student';
    }

    next();
  })
}

module.exports = {isAdmin, isTeacher, isStudent, checkJwt}