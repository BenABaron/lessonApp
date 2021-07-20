const express = require('express');
const router = express.Router();
const controller = require("../controller/userController");
const checks = require("../middleware/checks");

// ALL USERS

// Create User - POST
router.post('/createUser', [checks.checkJwt, checks.isAdmin], controller.createUser);

// Login - POST
router.post('/login', controller.loginUser);

// Get All Users - GET
router.get('/getAllUsers', controller.getAllUsers)


module.exports = router;