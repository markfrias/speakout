const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const passport = require('passport');
const _port = process.env.PORT || 3300;
const cors = require('cors');
require('./config/config');
require('./db');
require('./config/passportConfig');
const fileHandler = require('./upload');



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());

const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');
const postsRoute = require('./controllers/postController');



//handle validation errors within the application
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});





app.use('/uploads', express.static('uploads'));

app.listen(_port, (err) => {
    if (err) { throw err; }
    console.log(`Server started at port: ${_port}`)
});

app.use('/users', userController);
app.use('/topics', topicController);
app.use('/posts', postsRoute);
app.use(fileHandler);

