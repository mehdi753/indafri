const mongoose = require('mongoose');

const msgSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    message: { type: String, require: true },
    dateTime: { type: String, require: true }
});

const Msg = module.exports = mongoose.model('Msg', msgSchema);

module.exports.addMsg = (newMsg, callback) => {
    newMsg.save(callback);
};