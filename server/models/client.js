const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    type: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
});

const Client = module.exports = mongoose.model('Client', ClientSchema);