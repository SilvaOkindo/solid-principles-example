// src/services/MarkdownExportService.ts
import { Task } from '../models/Task';
import {IExportService} from "../interfaces/IExportService";

// OCP: Another export format - easy to extend!
export class MarkdownExportService implements IExportService {
    export(tasks: Task[]): string {
        let markdown = '# Tasks\n\n';

        tasks.forEach(task => {
            const checkbox = task.status === 'done' ? '[x]' : '[ ]';
            markdown += `## ${checkbox} ${task.title}\n\n`;
            markdown += `**Description:** ${task.description}\n\n`;
            markdown += `**Priority:** ${task.priority}\n\n`;
            markdown += `**Status:** ${task.status}\n\n`;
            if (task.dueDate) {
                markdown += `**Due Date:** ${task.dueDate.toLocaleDateString()}\n\n`;
            }
            markdown += '---\n\n';
        });

        return markdown;
    }

    getFileExtension(): string {
        return '.md';
    }
}