// SRP -> Single Responsibility Principle
// Only functions related to project class are here

export class Project {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public createdAt: Date = new Date()
    ) {}

    updateName(name: string): void {
        this.name = name
    }

    updateDescription(description: string): void {
        this.description = description
    }
}