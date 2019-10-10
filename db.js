const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/cscd311_class_project');
};

module.exports = {
    connect
}