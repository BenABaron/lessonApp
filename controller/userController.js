const connection = require('../sql/connection');
const bcrypt = require('bcrypt');
const { title } = require('process');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Create User - POST
let createUser = function(req, res){
  console.log('Inside my createUser /POST function', req.params);
  res.send('success');
}

// Edit User - PUT
let editUser = function(req, res){
  console.log('Inside my editUser /PUT function', req.params);
  res.send('success');
}

// Delete User - DELETE
let deleteUser = function(req, res){
  console.log('Inside my deleteUser /DELETE function', req.params);

  let idToDelete = req.params.user_id;

  if (idToDelete) {
    let deleteStmt = "DELETE FROM users WHERE user_id = ?";
    let params = [];
    params.push(idToDelete);

    connection.query(deleteStmt, params, function(error){
      if (error) {
        console.error("Error deleting user by id. Error: ", error);
        res.sendStatus(500);
      }

      res.send("successfully deleted user by id!")
    })
  }
  res.send('success');
}

// Login - POST
let loginUser = function(req, res){
  console.log('Inside my loginUser /POST function', req.params);
  res.send('success');
}

// Request Lesson - POST
let requestLesson = function(req, res){
  console.log('Inside my requestLesson /POST function', req.body);

  if (req.body) {

    let student_id = req.body.student_id;
    let teacher_id = req.body.teacher_id;
    let title = req.body.title;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let is_recurring = req.body.is_recurring

    let sqlStmt = `insert into lessons values (lesson_id, ?, ?, ?, ?, ?, ?, ?, ?, date(now()), 'n', null);`
    let params = [];
    params.push(student_id);
    params.push(teacher_id);
    params.push(title);
    params.push(start_date);
    params.push(end_date);
    params.push(start_time);
    params.push(end_time);
    params.push(is_recurring);

    connection.query(sqlStmt, params, function(error){
      if (error) {
        console.error('error requesting a lesson. Error: ', error);
        res.sendStatus(500);
      }

      res.send('successfully requested a lesson!')
    })

  } 
}

module.exports = {createUser, editUser, deleteUser, loginUser, requestLesson};