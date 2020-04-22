const express = require('express');
const bodyParser = require('body-parser');
const _port = process.env.PORT || 3000;

const { mongoose } = require('./db');
const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');

const app = express();
app.use(bodyParser.json());

// Routes
const postsRoute = require('./controllers/postController');

app.use('/posts', postsRoute);

app.listen(_port, (err) => {
    if (err) { throw err; }
    console.log(`Server started at port: ${_port}`)
});

app.use('/users', userController);
app.use('/topics', topicController);
