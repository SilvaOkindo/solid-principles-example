import {Task} from "../models/Task";

export interface ITaskFilter {
    filter(tasks: Task[]): Task[]
}