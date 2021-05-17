const connection = require('../sql/connection');

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

// Schedule Lesson - PUT
let scheduleLesson = function(req, res){
  console.log('Inside my scheduleLesson /PUT function', req.params);

  if (req.params) {

    let lesson_id = req.params.lesson_id;
    let is_accepted = 'y'

    let sqlStmt = `update lessons set is_accepted = ? where lesson_id = ?`
    let params = [];
    params.push(is_accepted);
    params.push(lesson_id);

    connection.query(sqlStmt, params, function(error){
      if (error) {
        console.error('error scheduling a lesson. Error: ', error);
        res.sendStatus(500);
      }

      res.send(`successfully scheduled lesson ${lesson_id}`);
    })

  }
}

// Edit Lesson Schedule - PUT
let editLessonSchedule = function(req, res){
  console.log('Inside my editLessonSchedule /PUT function', req.params);
  res.send('success');
}

// Add Schedule Exception - POST
let addScheduleException = function(req, res){
  console.log('Inside my addScheduleException /POST function', req.params);
  res.send('success');
}

// Edit Schedule Exception - PUT
let editScheduleException = function(req, res){
  console.log('Inside my editScheduleException /PUT function', req.params);
  res.send('success');
}

// Get Schedule by Week (or whatever) - GET
let getScheduleByWeek = function(req, res){
  console.log('Inside my getScheduleByWeek /GET function', req.params);
  res.send('success');
}

module.exports = {requestLesson, scheduleLesson, editLessonSchedule, addScheduleException, editScheduleException, getScheduleByWeek};