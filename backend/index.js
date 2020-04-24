const express = require('express');
const bodyParser = require('body-parser');
const _port = process.env.PORT || 3300;
const cors = require('cors');
// Routes
const { mongoose } = require('./db');
const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');
const postsRoute = require('./controllers/postController');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(_port, (err) => {
    if (err) { throw err; }
    console.log(`Server started at port: ${_port}`)
});

app.use('/users', userController);
app.use('/topics', topicController);
app.use('/posts', postsRoute);
