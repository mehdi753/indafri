const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    country: { type: String, require: true },
    agency: { type: String, require: true },
    name: { type: String, require: true },
    fname: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true }
});

const User = module.exports = mongoose.model('User', UserSchema);