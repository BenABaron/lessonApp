const connection = require('../sql/connection');

// Create Lesson - POST
let createLesson = function(req, res){
  console.log('Inside my createLesson /POST function', req.params);
  res.send('success');
}

// Edit Lesson - PUT
let editLesson = function(req, res){
  console.log('Inside my editLesson /PUT function', req.params);
  res.send('success');
}

// See all lessons - GET
let getAllLessons = function(req, res){
  console.log('Inside my getAllLessons /GET function', req.params);
  res.send('success');
}