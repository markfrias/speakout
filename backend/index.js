const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db');
const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server started at port: 3000'));

app.use('/users', userController);
app.use('/topics', topicController);
