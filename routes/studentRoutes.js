const express = require('express');
const {getAllStudents, getStudent, createStudent, updateStudentById, deleteStudentById} = require('../controller/studentController');
const token_verification = require('../middleware/token_verification');
const router = express.Router();

router.get('/list',token_verification,getAllStudents)
router.get('/list/:id', getStudent)
router.post('/create-student', createStudent)
router.put('/update-student/:id', updateStudentById)
router.delete('/delete-student/:id', deleteStudentById)

module.exports = router;