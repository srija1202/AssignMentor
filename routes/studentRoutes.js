const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/createStudent', studentController.createStudent);
router.put('/:studentId/mentor', studentController.changeMentor);
router.get('/:studentId/previous-mentors', studentController.getPreviousMentors);

module.exports = router;
