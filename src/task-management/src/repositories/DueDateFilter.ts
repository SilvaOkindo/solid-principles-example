import {ITaskFilter} from "../interfaces/ITaskFilter";
import {Task} from "../models/Task";

export class DueDateFilter implements ITaskFilter {
    constructor(
        private startDate: Date, private endDate: Date
    ) {
    }
    filter(tasks: Task[]): Task[] {
        return tasks.filter(task => {
            if (!task.dueDate) return false;
            return task.dueDate >= this.startDate && task.dueDate <= this.endDate;
        });
    }

}