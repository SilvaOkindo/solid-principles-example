// ISP + DIP

import {Task, TaskStatus, Priority} from "../models/Task";

export interface ITaskRepository {
    save(task: Task): void,
    findById(taskId: string): Task | null
    findAll(): Task []
    update(task: Task): void
    remove(taskId: string): void
    findByProjectId(projectId: string): Task[]
    findByStatus(status: TaskStatus): Task[]
    findByPriority(priority: Priority): Task[]
}