const connection = require('../sql/connection');
require('dotenv').config();

const bcrypt = require('bcrypt');
const { title } = require('process');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// Create User - POST
let createUser = function(req, res){
  console.log('Inside my createUser /POST function', req.body);

  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let password = req.body.password;
  let confirm_password = req.body.confirm_password;

  if (password != confirm_password) {
    res.status(400).send("Passwords do not match");
  }

  let passwordHash = bcrypt.hashSync(password, saltRounds);
  let sqlStmt1 = 'insert into users values (user_id, ?, ?, ?, ?);' 
  let sqlStmt2 = 'insert into user_roles values (last_insert_id(), 3);'

  let params = [];
  params.push(first_name);
  params.push(last_name);
  params.push(email);
  params.push(passwordHash);

  connection.getConnection(function(err, connection) {

    connection.beginTransaction(function(err){
      if (err) {
        console.error(err);
      }
  
      connection.query(sqlStmt1, params, function(error){
        if (error) {
          return connection.rollback(function(){
            throw error;
          })
        }
  
        connection.query(sqlStmt2, function(error){
          if (error) {
            return connection.rollback(function(){
              throw error;
            })
          }
          
          connection.commit(function(error){
            if (error) {
              return connection.rollback(function(){
                throw error;
              })
            } else {
              res.send("Successfully added new user!")
            }
          })
        });
      });
    });
  });

};

// Login - POST
let loginUser = function(req, res){
  console.log('Inside my loginUser /POST function', req.body);

  let email = req.body.email;
  let password = req.body.password;

  let sqlStmt = `select users.email, users.pass_hash, users.user_id, roles.description
  from users
  join user_roles 
  on users.user_id = user_roles.user_id
  join roles
  on user_roles.role_id = roles.role_id
  where email = ?;`

  connection.query(sqlStmt, [email], function(err, rows) {

    let goodPassword = false;
    let role;
    let id;

    if (err) {
      console.error("Error when querying the db. Error: ", err);
    }

    if (rows.length > 1) {
      console.error("Found too many rows with the email ", email);
    }

    if (rows.length == 0) {
      console.log("Did not find a user with the email ", email);
    }

    if (!err && rows.length == 1) {
      row = rows[0];

      let hash = row.pass_hash;

      role = row.description;

      id = row.user_id;

      goodPassword = bcrypt.compareSync(password, hash);
    }

    if (goodPassword) {
      const unsignedToken = {
        email: email,
        role: role,
        id: id
      };

      const accessToken = jwt.sign(unsignedToken, jwtSecret);
      
      res.json(accessToken);
    } else {
      res.status(401).send("Unauthorized!");
    }


  })
}

let getAllUsers = (req, res) => {
  console.log('Inside my getAllUsers /GET function');

  let sqlStmt = `select users.user_id, users.first_name, users.last_name, users.email, roles.description
  from users
  join user_roles
  on users.user_id = user_roles.user_id
  join roles
  on user_roles.role_id = roles.role_id`;

  connection.query(sqlStmt, function(err, rows) {
    if (err) {
      console.error("Error when querying the db. Error: ", err)
      res.sendStatus(500);
    } else {
      res.json(rows);
    }

  })
}

module.exports = {createUser, loginUser, getAllUsers};