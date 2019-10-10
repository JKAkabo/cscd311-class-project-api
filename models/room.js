const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    hallId: {
        type: mongoose.Schema.Types.ObjectId,
        required :true
    },
    occupantGender: {
        type: String,
        required: true,
        enum: ['M', 'F']
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;