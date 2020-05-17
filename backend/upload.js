const express = require('express');
const router = express.Router();
const multer = require('multer');
const app = express();
const download = require('image-downloader');
const options = {
    url: "",
    dest: './uploads/'
}

let filename;





const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, filename = file.fieldname + Date.now() + file.originalname);
        console.log(filename);
    }
});

const upload = multer({ storage: storage });



router.post('/images', upload.single('image'), function(req, res, next) {
    console.log("Upload successful.");
    
        res.json({
            'success' : 1,
            "file": {
                "url": "https://heroku-speakout.herokuapp.com/uploads/" + filename
            }
        })
    
});

router.post('/images/url', (req, res, next) => {
    
    // Download image to server
    download.image({
        url: req.body.url,
        dest: options.dest
    })
        .then(({ filename }) => {
            console.log('Saved to ', filename)
            res.json({ 
                success: 1,
                file: {
                    url : "https://heroku-speakout.herokuapp.com/uploads/" + (filename.slice(8, filename.length))
                }
             })
        })
        .catch((err) => console.error(err))
        res.json(err);
} );

/*router.get('/uploads/:id', (req, res, next) => {
    // Send file
    let filename = req.params.id;
    res.send("https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png");
}) */












module.exports = router, multer, express;