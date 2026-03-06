const multer = require("multer")
const multerS3 = require("multer-s3")
const s3 = require("../config/s3")

console.log(process.env.AWS_BUCKET_NAME)

const upload = multer({
 storage: multerS3({
   s3: s3,
   bucket: process.env.AWS_BUCKET_NAME,
   key: function (req, file, cb) {
       cb(null, Date.now().toString() + "-" + file.originalname)
   }
 })
})

module.exports = upload