import {ITaskFilter} from "../interfaces/ITaskFilter";
import {Task} from "../models/Task";

export class OverDueFilter implements ITaskFilter {
    filter(tasks: Task[]): Task[] {
        return tasks.filter(task => task.isOverDue())
    }
}