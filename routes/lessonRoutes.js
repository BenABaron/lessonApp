const express = require('express');
const router = express.Router();
const controller = require("../controller/lessonController");


// Create Lesson - POST
router.post('/createLesson', controller.createLesson);

// Edit Lesson - PUT
router.put('/editLesson', controller.editLesson);

// See all lessons - GET
router.get('/lessons', controller.getAllLessons);