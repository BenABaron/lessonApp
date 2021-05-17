const express = require('express');
const router = express.Router();
const controller = require("../controller/userController");
const checks = require("../controller/checks");

// ALL USERS

// Create User - POST
router.post('/createUser', controller.createUser);

// Login - POST
router.post('/login', controller.loginUser);


module.exports = router;