const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    sentDate: {
        type: String,
        required: true
    },
    sentTime: {
        type: String, 
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Message', msgSchema);