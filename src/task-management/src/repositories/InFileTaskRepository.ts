// src/repositories/FileTaskRepository.ts
import * as fs from 'fs';
import {Priority, Task} from '../models/Task';
import {ITaskRepository} from "../interfaces/ITaskRepository";

// OCP: New repository type without modifying existing code
// LSP: Can substitute InMemoryTaskRepository with FileTaskRepository
export class FileTaskRepository implements ITaskRepository {
    private readonly filePath: string;

    constructor(filePath: string = './tasks.json') {
        this.filePath = filePath;
        this.ensureFileExists();
    }

    private ensureFileExists(): void {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
    }

    private readTasks(): Task[] {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const tasksData = JSON.parse(data);
        return tasksData.map((t: any) =>
            new Task(
                t.id,
                t.title,
                t.description,
                t.priority,
                t.status,
                t.dueDate ? new Date(t.dueDate) : null,
                t.projectId,
                new Date(t.createdAt),
                t.completedAt ? new Date(t.completedAt) : null
            )
        );
    }

    private writeTasks(tasks: Task[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
    }

    save(task: Task): void {
        const tasks = this.readTasks();
        tasks.push(task);
        this.writeTasks(tasks);
        console.log(`✅ Task "${task.title}" saved to file`);
    }

    findById(id: string): Task | null {
        const tasks = this.readTasks();
        return tasks.find(t => t.id === id) || null;
    }

    findAll(): Task[] {
        return this.readTasks();
    }

    update(task: Task): void {
        const tasks = this.readTasks();
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks[index] = task;
            this.writeTasks(tasks);
            console.log(`✅ Task "${task.title}" updated in file`);
        }
    }

    remove(id: string): void {
        const tasks = this.readTasks();
        const filteredTasks = tasks.filter(t => t.id !== id);
        this.writeTasks(filteredTasks);
        console.log(`🗑️ Task deleted from file`);
    }

    findByProjectId(projectId: string): Task[] {
        return this.findAll().filter(task => task.projectId === projectId);
    }

    findByStatus(status: string): Task[] {
        return this.findAll().filter(task => task.status === status);
    }

    findByPriority(priority: Priority): Task[] {
        return this.findAll().filter(task => task.priority === priority);
    }

}