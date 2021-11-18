import { diskStorage } from 'multer';
import { extname } from 'path';

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        req.fileValidationError = 'Only Image files are allowed!';
        return callback(null, false);
    }
    callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(mp4|avi|3gp)$/)) {
        req.fileValidationError = 'Only video files are allowed!';
        return callback(null, false);
    }
    callback(null, true);
};

export const storage = {
    storage: diskStorage({
        destination: './profile',
        filename: editFileName,
    }),
    fileFilter: imageFileFilter,
}

export const storage2 = {
    storage: diskStorage({
        destination: './assets',
        filename: editFileName,
    }),
    fileFilter: videoFileFilter,
}