import {INotificationService} from "../interfaces/INotificationService";
import {Task} from "../models/Task";

// OCP: Another notification type - easy to add!
export class SlackNotificationService implements INotificationService {
    constructor(private webhookUrl: string) {}

    notifyTaskCreated(task: Task): void {
        console.log(`💬 Slack: Task "${task.title}" created`);
    }

    notifyTaskCompleted(task: Task): void {
        console.log(`💬 Slack: Task "${task.title}" completed`);
    }

    notifyTaskDue(task: Task): void {
        console.log(`💬 Slack: Task "${task.title}" due soon`);
    }
}
