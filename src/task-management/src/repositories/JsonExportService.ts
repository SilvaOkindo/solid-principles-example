import {IExportService} from "../interfaces/IExportService";
import {Task} from "../models/Task";

export class JsonExportService implements IExportService {
    export(tasks: Task[]): string {
        return JSON.stringify(tasks, null, 2);
    }

    getFileExtension(): string {
        return ".json";
    }

}