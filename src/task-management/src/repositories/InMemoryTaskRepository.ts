import {ITaskRepository} from "../interfaces/ITaskRepository";
import {Priority, Task, TaskStatus} from "../models/Task";

export class InMemoryTaskRepository implements ITaskRepository {
    private _tasks: Map<string, Task> = new Map()

    findAll(): Task[] {
        return Array.from(this._tasks.values())
    }

    findById(taskId: string): Task | null {

        return this._tasks.get(taskId) || null
    }

    findByPriority(priority: Priority): Task[] {
        return this.findAll().filter((task) => task.priority === priority);
    }

    findByProjectId(projectId: string): Task[] {
        return this.findAll().filter((task) => task.projectId === projectId);
    }

    findByStatus(status: TaskStatus): Task[] {
        return this.findAll().filter((task) => task.status === status);
    }

    remove(taskId: string): void {
        if(this._tasks.has(taskId)) {
            this._tasks.delete(taskId)
            console.log(`Task with id ${taskId} deleted successfully.`)
        }
    }

    save(task: Task): void {
        this._tasks.set(task.id, task)
        console.log(`Task with id ${task.id} saved successfully.`)
    }

    update(task: Task): void {
        if(this._tasks.has(task.id)) {
            this._tasks.set(task.id, task)
        } 
    }

}