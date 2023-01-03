//upload pictures to localhost
const router = require("express").Router();
const multer = require("multer");

//picture strage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
      },
      filename: (req, file, cb) => {
        cb(null,req.body.name);
      }
});

const upload = multer({ storage });

//create API for uploading pictures to localhost via multer
router.post("/", upload.single('file'), (req, res) => {
    try {
        return res.status(200).json("Upload picture is succeeded!")
    } catch (err){
        console.log(err);
    }
});

module.exports = router;