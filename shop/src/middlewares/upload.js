const multer = require('multer');

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG)$/)) {
        req.fileValidationError = 'Apenas arquivos jpg são permitidos!';
        return cb(new Error('Apenas arquivos jpg são permitidos!'), false);
    }

    return cb(null, true);
};

// only 1 file / max of 1MB
const limits = {
    fileSize: 1048576,
    files: 1,
};

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/public/uploads');
    },

    filename: (req, file, cb) => {
        const extension = file.originalname.split('.');
        cb(null, `${req.params.id}.${extension[1]}`);
    },
});

const upload = multer({ storage: diskStorage, limits, fileFilter: imageFilter }).single('file');

module.exports = upload;