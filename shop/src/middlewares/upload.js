const multer = require('multer');

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Apenas arquivos de imagens são permitidos!';
        return cb(new Error('Apenas arquivos de imagens são permitidos!'), false);
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
        cb(null, './public/uploads');
    },

    filename: (req, file, cb) => {
        cb(null, `${req.params.id}-${file.originalname}`);
    },
});

const upload = multer({ storage: diskStorage, limits, fileFilter: imageFilter }).single('file');

module.exports = upload;