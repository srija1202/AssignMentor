const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// Create Student
exports.createStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Change Mentor for a Student
exports.changeMentor = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;

        const student = await Student.findById(studentId);
        if (!student) return res.status(404).send({ message: 'Student not found' });

        // If the student already has a mentor, add the current mentor to the assignedMentors history
        if (student.mentor) {
            student.assignedMentors.push(student.mentor);
        }

        // Change mentor
        student.mentor = mentorId;
        await student.save();

        // Remove student from previous mentor's students list, if applicable
        if (student.mentor) {
            await Mentor.findByIdAndUpdate(student.mentor, { $pull: { students: studentId } });
        }

        // Add student to new mentor's students list
        await Mentor.findByIdAndUpdate(mentorId, { $addToSet: { students: studentId } });

        res.send(student);
    } catch (error) {
        res.status(400).send(error);
    }
};


// Get Previously Assigned Mentors for a Student
exports.getPreviousMentors = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('assignedMentors', 'name email');
        if (!student) return res.status(404).send({ message: 'Student not found' });

        res.send(student.assignedMentors);
    } catch (error) {
        res.status(400).send(error);
    }
};

