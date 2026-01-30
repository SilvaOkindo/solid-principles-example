import {IExportService} from "../interfaces/IExportService";
import {Task} from "../models/Task";

export class CSVExportService implements IExportService {
    export(tasks: Task[]): string {
        if (tasks.length === 0) return '';

        const headers = 'ID,Title,Description,Priority,Status,Due Date,Created At\n';
        const rows = tasks.map(task =>
            `${task.id},"${task.title}","${task.description}",${task.priority},${task.status},${task.dueDate || 'N/A'},${task.createdAt}`
        ).join('\n');

        return headers + rows;
    }

    getFileExtension(): string {
        return '.csv';
    }
}