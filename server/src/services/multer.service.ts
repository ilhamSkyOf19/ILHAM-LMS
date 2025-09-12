import { Request, RequestHandler } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";

export class MulterService {

    // upload file cover 
    static uploadFile(name: string): RequestHandler {

        // storage
        const storage = multer.diskStorage({
            // destination 
            destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
                // folder uploads 
                const uploads: string = path.join(__dirname, '../../public/uploads/file');

                // cek folder 
                if (!fs.existsSync(uploads)) {
                    // create folder
                    fs.mkdirSync(uploads, {
                        recursive: true
                    });
                }

                // cb 
                cb(null, uploads);
            },


            // filename 
            filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {

                // date 
                const date: number = Date.now()

                // ext 
                const ext: string = path.extname(file.originalname);

                // full name 
                const newFileName: string = `file-${date}${ext}`;

                // cb
                cb(null, newFileName);
            }

        })

        // file filter 
        const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {

            // allow ext
            const allowMimeType = ['image/jpg', 'image/png', 'image/jpeg'];


            // cek 
            if (allowMimeType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type'));
            }
        }

        // upload 
        const upload = multer({
            storage,
            fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 2
            }
        }).single(name);


        // return 
        return upload


    }
}