import * as fsp from 'fs/promises';
import path from 'path';
import { ResponseMessage } from '../types/types';


export class FileService {

    // delete file request 
    static async deleteFileRequest(path: string): Promise<void> {
        try {
            // cek file
            await fsp.access(path);

            // delete 
            await fsp.unlink(path)
            console.log('file deleted successfully');
        } catch (error) {
            console.log(error)
            console.warn('file not found');
        }
    }


    // delete file in path 
    static async deleteFileFormPath(filename: string, filePath: string): Promise<ResponseMessage> {

        // cek file path 
        if (!filename || !filePath) return {
            success: false,
            message: 'File not exist'
        };

        // file full paht 
        const filePathFull = path.join(
            __dirname,
            `../../public/uploads/${filePath}/${filename}`
        )


        // delete file 
        try {

            // cek file 
            await fsp.access(filePathFull);
            // delete 
            await fsp.unlink(filePathFull);

            return {
                success: true,
                message: 'File deleted successfully'
            }

        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: 'File not found or failed to delete'
            };
        }
    }
}