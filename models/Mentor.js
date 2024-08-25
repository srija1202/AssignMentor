const mongoose = require('mongoose');

// Define the Mentor schema
const MentorSchema = new mongoose.Schema({
    _id: Number,
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    students: [{ type: Number, ref: 'Student' }],
    expertise: String
});

// Create the Mentor model using the schema
const Mentor = mongoose.model('Mentor', MentorSchema);

module.exports = Mentor;
