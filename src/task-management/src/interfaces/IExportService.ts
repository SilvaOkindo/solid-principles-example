import {Task} from "../models/Task";

export interface IExportService {
    export(tasks: Task[]): string
    getFileExtension(): string
}