const express = require('express');
const router = express.Router();
const multer = require('multer');
const app = express();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, file.fieldname + Date.now() + '.png')
    }
});

const upload = multer({ storage: storage });



router.post('/images', upload.single('image'), function(req, res, next) {
    console.log("Upload successful.");
    res.json({ "message": "success" });
});










module.exports = router, multer, express;