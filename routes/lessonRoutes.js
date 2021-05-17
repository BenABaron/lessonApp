const express = require('express');
const router = express.Router();
const controller = require("../controller/lessonController");
const checks = require("../controller/checks");

// Request Lesson - POST
router.post('/requestLesson', [checks.checkJwt, checks.isStudent], controller.requestLesson);

// Schedule Lesson - PUT
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