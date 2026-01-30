import {INotificationService} from "../interfaces/INotificationService";
import {Task} from "../models/Task";

export class ConsoleNotificationService implements INotificationService {
    notifyTaskCreated(task: Task): void {
        console.log(`🔔 Console: Task "${task.title}" has been created`);
    }

    notifyTaskCompleted(task: Task): void {
        console.log(`🎉 Console: Task "${task.title}" is complete!`);
    }

    notifyTaskDue(task: Task): void {
        console.log(`⏰ Console: Task "${task.title}" is due soon!`);
    }
}