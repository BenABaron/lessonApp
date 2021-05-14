const express = require('express');
const router = express.Router();
const controller = require("../controller/lessonController");


// Schedule Lesson - POST
router.put('/scheduleLesson/:lesson_id', controller.scheduleLesson);

// Edit Lesson Schedule - PUT
router.put('/editLessonSchedule', controller.editLessonSchedule);

// Add Schedule Exception - POST
router.post('/addScheduleException', controller.addScheduleException);

// Edit Schedule Exception - PUT
router.put('/editScheduleException', controller.editScheduleException);

// Get Schedule by Week (or whatever) - GET
router.get('/getScheduleByWeek', controller.getScheduleByWeek);


module.exports = router;