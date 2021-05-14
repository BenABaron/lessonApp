const connection = require('../sql/connection');

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

module.exports = {scheduleLesson, editLessonSchedule, addScheduleException, editScheduleException, getScheduleByWeek};