const express = require('express');
const router = express.Router();
const controller = require("../controller/lessonController");
const checks = require("../middleware/checks");

// Request Lesson - POST
router.post('/requestLesson', [checks.checkJwt, checks.isStudent], controller.requestLesson);

// Schedule Lesson - PUT
router.put('/scheduleLesson/:lesson_id', [checks.checkJwt, checks.isTeacher], controller.scheduleLesson);

// Edit Non-Recurring Lesson - PUT
router.put('/editNonRecurringLesson/:lesson_id', [checks.checkJwt, checks.isTeacher], controller.editNonRecurringLesson);

// Update Recurring Lesson - POST
router.post('/updateRecurringLesson/:lesson_id', [checks.checkJwt, checks.isTeacher], controller.updateRecurringLesson);

// Add Schedule Exception - POST
router.post('/addScheduleException/:lesson_id', [checks.checkJwt, checks.isTeacher], controller.addScheduleException);

// Get Schedule by Week (or whatever) - GET
// router.get('/getScheduleToday', [checks.checkJwt, checks.isTeacher], controller.getScheduleToday);
router.get('/getScheduleToday', controller.getScheduleToday);


module.exports = router;