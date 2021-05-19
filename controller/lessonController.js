const connection = require('../sql/connection');

/**
 * Request Lesson - POST
 * 
 * This will allow students to request lessons, recurring or non-recurring
 * if recurring, additional keys and values are required in the body of the request
 * 
 */
let requestLesson = function(req, res){
  console.log('Inside my requestLesson /POST function', req.body);

  if (req.body) {

    let student_id = req.body.student_id;
    let title = req.body.title;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
    let is_recurring = req.body.is_recurring

    let params = [];
    params.push(student_id);
    params.push(title);
    params.push(start_date);
    params.push(end_date);
    params.push(start_time);
    params.push(end_time);
    params.push(is_recurring);

    if (is_recurring == true) {
      // If the lesson is reccuring, these are the additional keys and values that are required for the request to go through. This is necessary because the recurrance is a seperate table than the lesson, and both must be added to simultaneously

      let recurring_type_id = req.body.recurring_type_id;
      let separation_count = req.body.separation_count;
      let max_occurances = req.body.max_occurances;
      let day_of_week = req.body.day_of_week;
      let week_of_month = req.body.week_of_month;
      let day_of_month = req.body.day_of_month;
      let month_of_year = req.body.month_of_year;
      
      let params2 = [];
      params2.push(recurring_type_id);
      params2.push(separation_count);
      params2.push(max_occurances);
      params2.push(day_of_week);
      params2.push(week_of_month);
      params2.push(day_of_month);
      params2.push(month_of_year);

      let sqlStmt1 = 'insert into lessons values (lesson_id, ?, ?, ?, ?, ?, ?, ?, now(), false, null, null);'
      let sqlStmt2 = 'insert into recurrance values (last_insert_id(), ?, ?, ?, ?, ?, ?, ?);'

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
      
            connection.query(sqlStmt2, params2, function(error){
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
                  res.send("Successfully requested a recurring lesson!")
                }
              })
            });
          });
        });
      });


    } else if (is_recurring == false) {
      // If the lesson is not reccuring, the recurrance table does not need to be accessed, and instead we just insert into the lesson table.

      if (start_date == end_date) {

        let sqlStmt = 'insert into lessons values (lesson_id, ?, ?, ?, ?, ?, ?, ?, now(), false, null, null);'
    
        connection.query(sqlStmt, params, function(error){
          if (error) {
            console.error('error requesting a lesson. Error: ', error);
            res.sendStatus(500);
          }
    
          res.send('successfully requested a non recurring lesson!')
        })

      } else {
        res.send('Start and end date must be the same for a non-recurring lesson!')
      }

    }


  } else {
    res.send("Unsuccessful");
  }
}

// Schedule Lesson - PUT
let scheduleLesson = function(req, res){
  console.log('Inside my scheduleLesson /PUT function', req.params);

  if (req.params) {

    let lesson_id = req.params.lesson_id;
    let is_accepted = true;

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

// Edit Non-Recurring Lesson - PUT
let editNonRecurringLesson = function(req, res){
  console.log('Inside my editNonRecurringLesson /PUT function', req.params, req.body);

  if (req.body) {

    let lesson_id = req.params.lesson_id;
    let title = req.body.title;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;
  
    let params = [];
    params.push(title);
    params.push(start_date);
    params.push(end_date);
    params.push(start_time);
    params.push(end_time);
    params.push(lesson_id);

    let sqlStmt = 'update lessons set title = ?, start_date = ?, end_date = ?, start_time = ?, end_time = ?, updated_date = now() where lesson_id = ? and is_recurring = false;'

    connection.query(sqlStmt, params, function(error, rows){
      if (error) {
        console.error('error editing a scheduled lesson. Error: ', error);
        res.sendStatus(500);
      }

      if (rows.affectedRows == 0) {
        res.send(`Could not find lesson with id ${lesson_id}, or lesson id ${lesson_id} is recurring.`)
      } else {
        res.send('successfully edited a scheduled non-recurruing lesson!')
      }
      
    })

  } else {
    res.send("Unsuccessful");
  }
}

// Update Recurring Lessons - POST
let updateRecurringLesson = function(req, res){
  console.log('Inside my updateRecurringLesson /POST function', req.params, req.body);

  if (req.body) {

    let lesson_id = req.params.lesson_id;
    let student_id = req.body.student_id;
    let title = req.body.title;
    let end_date = req.body.end_date;
    let start_time = req.body.start_time;
    let end_time = req.body.end_time;

    let params = [];
    params.push(student_id);
    params.push(title);
    params.push(end_date);
    params.push(start_time);
    params.push(end_time);
    params.push(lesson_id);

    let recurring_type_id = req.body.recurring_type_id;
    let separation_count = req.body.separation_count;
    let max_occurances = req.body.max_occurances;
    let day_of_week = req.body.day_of_week;
    let week_of_month = req.body.week_of_month;
    let day_of_month = req.body.day_of_month;
    let month_of_year = req.body.month_of_year;
    
    let params2 = [];
    params2.push(recurring_type_id);
    params2.push(separation_count);
    params2.push(max_occurances);
    params2.push(day_of_week);
    params2.push(week_of_month);
    params2.push(day_of_month);
    params2.push(month_of_year);

    let sqlStmt1 = 'update lessons set end_date = date(now()) where lesson_id = ?'
    let sqlStmt2 = 'insert into lessons values (lesson_id, ?, ?, date(now()), ?, ?, ?, true, now(), true, null, ?);'
    let sqlStmt3 = 'insert into recurrance values (last_insert_id(), ?, ?, ?, ?, ?, ?, ?);'

    connection.getConnection(function(err, connection) {

      connection.beginTransaction(function(err){
        if (err) {
          console.error(err);
        }
    
        connection.query(sqlStmt1, [lesson_id], function(error){
          if (error) {
            return connection.rollback(function(){
              throw error;
            })
          }
    
          connection.query(sqlStmt2, params, function(error){
            if (error) {
              return connection.rollback(function(){
                throw error;
              })
            }

            connection.query(sqlStmt3, params2, function(error){
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
                  res.send("Successfully updated a recurring lesson!")
                }
              })          
            });
          });
        });
      });
    });

  } else {
    res.send("Unsuccessful");
  }
}

// Add Schedule Exception - POST
let addScheduleException = function(req, res){
  console.log('Inside my addScheduleException /POST function', req.params, req.body);

  if (req.body) {

    let lesson_id = req.params.lesson_id;
    let is_rescheduled = req.body.is_rescheduled;
    let is_cancelled = req.body.is_cancelled;
    let lesson_date_original = req.body.lesson_date_original;
    let start_time_original = req.body.start_time_original;
    let end_time_original = req.body.end_time_original;
    let lesson_date_new = req.body.lesson_date_new;
    let start_time_new = req.body.start_time_new;
    let end_time_new = req.body.end_time_new;

    let params = [];

    params.push(lesson_id);
    params.push(is_rescheduled);
    params.push(is_cancelled);
    params.push(lesson_date_original);
    params.push(start_time_original);
    params.push(end_time_original);
    params.push(lesson_date_new);
    params.push(start_time_new);
    params.push(end_time_new);

    let sqlStmt = 'insert into lesson_instance_exception values (exception_id, ?, ?, ?, ?, ?, ?, ?, ?, ?, now());'

    connection.query(sqlStmt, params, function(error, rows){
      if (error) {
        console.error("Error creating lesson exception. Error: ", error);
        res.sendStatus(500);
      }

      res.send("Successfully added a lesson instance exception");
    })

  } else {
    res.send("Unsuccessful");
  }
}

// Get Schedule by Week (or whatever) - GET
let getScheduleToday = function(req, res){
  console.log('Inside my getScheduleToday /GET function', req.params);

  let sqlStmt = `select * from lessons l 
  left join recurrance r
  on l.lesson_id = r.recurrance_id
  left join lesson_instance_exception e
  on l.lesson_id = e.lesson_id
  where l.start_date <= date(now())
  and l.end_date >= date(now())
  and l.is_accepted = true;`

  connection.query(sqlStmt, function(error, rows){
    if (error) {
      console.error("Error retreiving lessons from db. Error: ", error);
      res.sendStatus(400).send("Error retreiving lessons");
    }

    console.log(rows);
    res.json(rows);
  })
}

module.exports = {requestLesson, scheduleLesson, editNonRecurringLesson, updateRecurringLesson, addScheduleException, getScheduleToday};