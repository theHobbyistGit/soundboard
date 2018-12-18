import {Injectable} from '@angular/core';
import {ElectronService} from '../electron/electron.service';
import {Observable} from 'rxjs';

/**
 * @name FileService - In this service, every interaction with the filesystem or path creation should take place
**/
@Injectable()
export class FileService {

    private appRootPath: string;

    constructor(private electron: ElectronService) {
        this.appRootPath = this.electron.remote.app.getAppPath();
    }

    /**
     * @name loadFile() - Method to load any content from a file given by the path parameter
     * @param path - the path to the file that should be loaded
     */
    public loadFile(path: string): Observable<string> {
        return Observable.create((observer) => {
            if (path !== '') {
                this.electron.fs.readFile(path, (err, data) => {
                    if (err) {
                        observer.error(err);
                    } else {
                        observer.next(data.toString()); // Buffer has to be converted to string for later usage
                        observer.complete();
                    }
                });
            } else {
                observer.error('FileService.loadFile(): FILENAME IS EMPTY');
            }
        });
    }

    /**
     * @name writeFile() - Method to write JSON Data given by the data parameter to a file
     * @param path - the path to the file that should be loaded
     * @param data - The JSON Data to be written in the file mentioned in path parameter
     */
    public writeFile(path: string, data: string): Observable<boolean> {
        return Observable.create((observer) => {
            if (path !== '') {
                this.electron.fs.writeFile(path, data, (err) => {
                    if (err) {
                        observer.error(err);
                    } else {
                        observer.next(true);
                        observer.complete();
                    }
                });
            } else {
                observer.error('FileService.writeFile(): FILENAME IS EMPTY');
            }
        });
    }

    /**
     * @name makeFolder() - create folder in specified path
     * @param path - folder path to be created
     */
    public makeFolder(path: string): void {
        this.electron.fs.mkdirSync(path);
    }

    /**
     * @name isFileExistent() - checks if File or Folder already exists and returns the answer as boolean
     * @param path - the path/file to be checked (AppRootPath is added by the function)
     */
    public isFileExistent(path: string): boolean {
        return this.electron.fs.existsSync(path);
    }
}
