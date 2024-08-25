const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// Create Mentor with custom numeric ID
exports.createMentor = async (req, res) => {
    try {
        const { _id, name, email, expertise } = req.body;
        const mentor = new Mentor({ _id, name, email, expertise });
        await mentor.save();
        res.status(201).send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Assign Multiple Students to a Mentor
exports.assignStudentsToMentor = async (req, res) => {
    try {
        const { mentorId } = req.params; // mentorId is a custom numeric ID
        const mentor = await Mentor.findById(mentorId);
        if (!mentor) return res.status(404).send({ message: 'Mentor not found' });

        const students = await Student.find({
            _id: { $in: req.body.studentIds }
        });

        if (students.length === 0) {
            return res.status(404).send({ message: 'No available students found' });
        }

        students.forEach(student => {
            student.mentor = mentor._id;
        });

        await Student.updateMany(
            { _id: { $in: req.body.studentIds } },
            { $set: { mentor: mentor._id } }
        );

        mentor.students.push(...students.map(student => student._id));
        await mentor.save();

        res.send(mentor);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get All Students for a Mentor
exports.getStudentsForMentor = async (req, res) => {
    try {
        const { mentorId } = req.params; // mentorId is a custom numeric ID
        const mentor = await Mentor.findById(mentorId).populate('students');
        if (!mentor) return res.status(404).send({ message: 'Mentor not found' });

        res.send(mentor.students);
    } catch (error) {
        res.status(400).send(error);
    }
};
