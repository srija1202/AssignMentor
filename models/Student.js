const mongoose = require('mongoose');

// Define the Student schema
const StudentSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mentor: { type: Number, ref: 'Mentor' },
    assignedMentors: [{ type: Number, ref: 'Mentor' }],
    course: [{ type: String }]
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
