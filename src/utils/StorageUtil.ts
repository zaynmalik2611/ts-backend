import { Request, Express } from "express";
import multer from "multer";
import path from "path";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

class StorageUtil {
    public storage = multer.diskStorage({
        destination: function(req: Request, file: Express.Multer.File, callback: DestinationCallback) {
            callback(null, 'uploads/');
        },
        filename: function (req: Request, file: Express.Multer.File, callback: FileNameCallback) {
            callback(null, Date.now() + path.extname(file.originalname));
        }
    });
    public upload = multer({storage: this.storage});
}

export = new StorageUtil();