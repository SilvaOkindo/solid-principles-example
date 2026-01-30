// SRP -> Single Responsibility Principle
// Only functions related to task class are here

export enum TaskStatus {
    DONE = 'done',
    IN_PROGRESS = 'in_progress',
    TODO = 'todo'
}

export enum Priority {
    HIGH = 'high',
    LOW = 'low',
    MEDIUM = 'medium',
}

export class Task {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public status: TaskStatus,
        public priority: Priority,
        public dueDate: Date | null,
        public projectId: string,
        public createdAt: Date = new Date(),
        public completedAt: Date | null = null
    ) {}


    markAsComplete(): void {
        this.status = TaskStatus.DONE
        this.completedAt = new Date()
    }


    markAsInProgress(): void {
        this.status = TaskStatus.IN_PROGRESS
    }

    isOverDue(): boolean {
        if(!this.dueDate || this.status === TaskStatus.DONE) {
            return false
        }

        return new Date() > this.dueDate

    }

    updateTitle(title: string) : void {
        this.title = title
    }

    updateDescription(description: string) : void {
        this.description = description
    }

    updateStatus(status: TaskStatus) : void {
        this.status = status
    }

    updatePriority(priority: Priority) : void {
        this.priority = priority
    }

    updateDueDate(dueDate: Date | null): void {
        this.dueDate = dueDate
    }


}