import {INotificationService} from "../interfaces/INotificationService";
import {Task} from "../models/Task";

export class EmailNotificationService implements INotificationService {
    notifyTaskCompleted(task: Task): void {
        console.log(`📧 Email: Task "${task.title}" has been created`);
    }

    notifyTaskCreated(task: Task): void {
        console.log(`📧 Email: Congrats! Task "${task.title}" is complete`);
    }

    notifyTaskDue(task: Task): void {
        console.log(`📧 Email: Reminder! Task "${task.title}" is due soon`);
    }

}