import {Task} from "../models/Task";

export interface INotificationService {
    notifyTaskCompleted(task: Task): void
    notifyTaskCreated(task: Task): void
    notifyTaskDue(task: Task): void

}