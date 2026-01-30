import {ITaskFilter} from "../interfaces/ITaskFilter";
import {Priority, Task} from "../models/Task";

export class PriorityFilter implements ITaskFilter {
    constructor(private priority: Priority) {}
    filter(tasks: Task[]): Task[] {
        return tasks.filter(task => task.priority === this.priority)
    }

}