const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const Client = require('../models/client');
exports.signup = (req, res, next) => {
    const newUser = new User({
        country: req.body.country,
        agency: req.body.agency,
        name: req.body.name,
        fname: req.body.fname,
        email: req.body.email,
        phone: req.body.phone
    });
    User.findOne({ agency: req.body.agency }).then((user) => {
        if (user) {
            res.json({ success: false, message: 'Agency already registered' });
        } else {
            User.findOne({ email: newUser.email }).then((user1) => {
                if (user1) {
                    res.json({ success: false, message: 'Email already registered' });
                } else {
                    User.findOne({ phone: newUser.phone }).then((user2) => {
                        if (user2) {
                            res.json({ success: false, message: 'Phone already registered' });
                        } else {
                            newUser.save().then(() => {
                                res.json({ success: true, message: 'User registered' });
                            }).catch((error) => {
                                res.json({ success: false, message: 'Failed to register user' });
                            });
                        };
                    });
                };
            });
        };
    });
};
exports.create = (req, res, next) => {
    Client.findOne({ email: req.body.email }).then((client) => {
        console.table([client.email]);
        res.json({ success: false, message: 'Email used' });
    }).catch(() => {
        bcrypt.hash(req.body.password, 10).then(
            (hash) => {
                const client = new Client({
                    type: req.body.type,
                    email: req.body.email,
                    password: hash
                });
                client.save().then(
                    () => {
                        res.json({ success: true, message: 'Done' });
                    }
                ).catch(
                    (error) => {
                        res.json({ success: false, message: 'error' });
                    }
                );
            }
        );
    });
}
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.table([email, password])
    Client.findOne({ email: req.body.email }).then((client) => {
        console.table([client.email])
        bcrypt.compare(req.body.password, client.password).then((valid) => {
            console.table([valid])
            if (valid) {
                const token = jwt.sign(client.toJSON(), config.secret, { expiresIn: 604800 });
                res.json({
                    success: true,
                    token: 'bearer ' + token,
                    client: {
                        _id: client._id,
                        type: client.type,
                        email: client.email
                    },
                    msg: 'You are Logged in'
                });
            } else {
                res.json({ success: false, msg: 'Wrong password' });
            }
        });
    }).catch(() => {
        res.json({ success: false, msg: "Couldn't find email" });
    });
}