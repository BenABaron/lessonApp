const express = require('express');
const router = express.Router();
const controller = require("../controller/userController");

// ALL USERS

// Create User - POST
router.post('/createUser', controller.createUser);

// Login - POST
router.post('/login', controller.loginUser);

// Edit User - PUT
router.put('/editUser', controller.editUser);

// Delete User - DELETE
router.delete('/deleteUser', controller.deleteUser);

// STUDENTS ONLY

// Request Lesson - POST
router.post('/requestLesson', controller.requestLesson);

// TEACHERS ONLY

// Set availability - POST
router.post('/setAvailability', controller.setAvailability);

// Edit availability
router.put('/editAvailability', controller.editAvailability);