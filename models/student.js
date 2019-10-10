const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
    idNumber: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    pin: {
        type: String,
        required: true
    }
});

studentSchema.pre('save', function (next) {
    let student = this;
    if (!student.isModified('pin')) return next();

    bcrypt.hash(student.pin, 10).then(hashedPin => {
        student.pin = hashedPin;
        next();
    }, (err) => next())
});

studentSchema.methods.comparePin = function (candidatePin, next) {
    bcrypt.compare(candidatePin, this.pin, function(err, isMatch) {
        if (err) return next(err);

        next(null, isMatch);
    })
}

module.exports = mongoose.model('Student', studentSchema);