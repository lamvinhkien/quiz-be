const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadDir;

        if (__dirname.includes('build')) {
            uploadDir = path.join(process.cwd(), 'public', 'uploads');
        } else {
            uploadDir = 'src/public/uploads/';
        }

        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

module.exports = upload