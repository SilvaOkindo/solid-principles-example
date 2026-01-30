import {Project} from "../models/Project";

export interface IProjectRepository {
    save(project: Project): void;
    findById(id: string): Project | null;
    findAll(): Project[];
    update(project: Project): void;
    delete(id: string): void;
}
