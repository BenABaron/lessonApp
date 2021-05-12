const connection = require('../sql/connection');


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
  res.send('success');
}

// Login - POST
let loginUser = function(req, res){
  console.log('Inside my loginUser /POST function', req.params);
  res.send('success');
}

// Request Lesson - POST
let requestLesson = function(req, res){
  console.log('Inside my requestLesson /POST function', req.params);
  res.send('success');
}

// Set Availability - POST
let setAvailability = function(req, res){
  console.log('Inside my setAvailability /POST function', req.params);
  res.send('success');
}

// Edit Availability - PUT
let editAvailability = function(req, res){
  console.log('Inside my editAvailability /PUT function', req.params);
  res.send('success');
}