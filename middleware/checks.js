require('dotenv').config();

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Check if the user has the Admin role
let isAdmin = function(req, res, next) {
  if (req.isAdmin) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

// Check if the user has the Teacher role
let isTeacher = function(req, res, next) {
  if (req.isTeacher) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

// Check if the user has the Student role
let isStudent = function(req, res, next) {
  if (req.isStudent) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

// Check the json web token to see if it is valid
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

    // assign values to be included in the token, namely the email and the role
    console.log(decoded);
    req.email = decoded.email;
    req.user_id = decoded.id;
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