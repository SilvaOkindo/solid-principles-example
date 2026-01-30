import {IProjectRepository} from "../interfaces/IProjectRepository";
import {Project} from "../models/Project";

export class InMemoryProjectRepository implements IProjectRepository {

    private _projects: Map<string, Project> = new Map()

    delete(id: string): void {
        if (this._projects.has(id)) {
            this._projects.delete(id)
            console.log(`Project with id ${id} deleted`)
        }
    }

    findAll(): Project[] {
        return Array.from(this._projects.values());
    }

    findById(id: string): Project | null {
        return  this._projects.get(id) || null;
    }

    save(project: Project): void {
        this._projects.set(project.id, project)
        console.log(`Project saved with id ${project.id}`)
    }

    update(project: Project): void {
        if(this._projects.has(project.id)) {
            this._projects.set(project.id, project);
            console.log(`Project updated with id ${project.id}`)
        }
    }

}