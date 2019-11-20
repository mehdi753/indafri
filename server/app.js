const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const userRouter = require('./router/userRouter');
const config = require('./config/database');
const contactRouter = require('./router/contactRouter');

const app = express();
const port = 5000;

mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', () => { console.log('connected') });
mongoose.connection.on('error', (error) => { console.log('connection to database:' + error) });

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/user', userRouter);
app.use('/contact', contactRouter);

app.listen(port, () => {
    console.log("server started on port 2000");
});