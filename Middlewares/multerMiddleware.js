const multer = require('multer');

// to store the multer data
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    // create a new filename
    filename: (req, file, callback) => {
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null, filename)
    }
})

// filter
const fileFilter = (req, file, callback) => {

    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg']

    if (allowedMimeTypes.includes(file.mimetype)) {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new Error('Invalid file Type... must be image/jpeg or image/png or image/jpg'))
    }
}

const multerConfig = multer({
    storage, fileFilter
})

module.exports = multerConfig