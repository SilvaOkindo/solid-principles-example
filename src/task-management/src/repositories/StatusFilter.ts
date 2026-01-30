import {ITaskFilter} from "../interfaces/ITaskFilter";
import {Task, TaskStatus} from "../models/Task";

export class StatusFilter implements ITaskFilter {
    constructor(private status: TaskStatus) {}
    filter(tasks: Task[]): Task[] {
        return tasks.filter(task => task.status === this.status);
    }

}