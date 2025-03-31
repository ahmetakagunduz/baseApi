const multer = require('multer');
const path = require('path');
const fs = require('fs');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PNG, JPEG and JPEG are allowed.'), false);
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootDir = path.dirname(require.main.filename);
        console.log("require.main.filename", require.main.filename)
        fs.mkdirSync(path.join(rootDir, '/public/uploads'), { recursive: true });
        cb(null, path.join(rootDir, '/public/uploads'));

    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1]

        if (!req.savedIgames) req.savedIgames = []

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        let url = 'image-' + uniqueSuffix + '.' + extension
        req.savedIgames = [...req.savedIgames, path.join(url)]
        cb(null, url)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50 MB
    },
    fileFilter: fileFilter
}).array('images', 10); // Accept up to 10 files

module.exports = upload