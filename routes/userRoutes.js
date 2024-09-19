const express = require('express');
const {getAllUsers, signUp,signIn} = require('../controller/userController');

const router = express.Router();

router.get('/users', getAllUsers)
router.post('/create-user', signUp)
router.post('/login',signIn)

module.exports = router;