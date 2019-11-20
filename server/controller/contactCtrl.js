const Msg = require('../models/msgModel');

exports.saveMsg = (req, res, next) => {
    const newMsg = new Msg({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        dateTime: req.body.dateTime
    });
    newMsg.save().then(() => {
        res.json({ success: false, message: 'Failed to send message' })
    }).catch((error) => {
        res.json({ success: true, message: 'Message successfully sent' });
    });
};

exports.viewMsgs = (req, res, next) => {
    Msg.find().then((msgs) => {
        res.json(msgs);
    }).catch(() => {
        res.json({ success: false, msg: "Couldn't find any messages" });
    });
}
exports.viewMsgsByEmail = (req, res, next) => {
    Msg.find({ email: req.body.email }).then((msgs) => {
        res.json(msgs);
    }).catch(() => {
        res.json({ success: false, msg: "Couldn't find any messages" });
    });
}
exports.deleteMsg = (req, res, next) => {
    Msg.deleteOne({ _id: req.body.id }).then((msg) => {
        res.json({ success: true, msg: 'Message have been deleted' });
    }).catch((err) => {
        res.json({ success: false, msg: "Couldn't find any messages" });
    })
}
exports.clearAllMsgs = (req, res, next) => {
    Msg.deleteMany().then(() => {
        res.json({ success: true, msg: 'Dashboard Cleared' });
    }).catch(() => {
        res.json({ success: false, msg: "Couldn't delete any messages" });
    })
}