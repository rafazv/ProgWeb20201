const multer = require('multer');

const imageFilter = function (req, file, cb) {
    console.log(file);
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

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let name = file.originalname; // devo salvar na vdd com o nome do id
        cb(null, name);
    },
    destination: function (req, file, cb) {
        let path = './public/uploads';
        cb(null, path);
    }
});

const upload = multer({ storage, limits, fileFilter: imageFilter }).single('file');

module.exports = { upload };