const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Hall = mongoose.model('Hall', hallSchema);

module.exports = Hall;