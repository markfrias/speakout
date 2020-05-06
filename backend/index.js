const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const _port = process.env.PORT || 3300;
const cors = require('cors');
const { mongoose } = require('./db');


const userController = require('./controllers/userController');
const topicController = require('./controllers/topicController');
const postsRoute = require('./controllers/postController');
const fileHandler = require('./upload');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(fileHandler);


app.use('/uploads', express.static('uploads'));

app.listen(_port, (err) => {
    if (err) { throw err; }
    console.log(`Server started at port: ${_port}`)
});

app.use('/users', userController);
app.use('/topics', topicController);
app.use('/posts', postsRoute);
