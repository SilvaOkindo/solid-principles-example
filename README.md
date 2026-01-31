# Task Management System 📋

A command-line task management application built with **TypeScript**, designed from the ground up to demonstrate and apply all five **SOLID principles**. Organize tasks into projects, set priorities and due dates, filter and export tasks in multiple formats, and receive notifications when tasks are due.

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [SOLID Principles](#solid-principles)
   - [Single Responsibility Principle (SRP)](#single-responsibility-principle-srp)
   - [Open/Closed Principle (OCP)](#openclosed-principle-ocp)
   - [Liskov Substitution Principle (LSP)](#liskov-substitution-principle-lsp)
   - [Interface Segregation Principle (ISP)](#interface-segregation-principle-isp)
   - [Dependency Inversion Principle (DIP)](#dependency-inversion-principle-dip)
5. [Models](#models)
6. [Interfaces](#interfaces)
7. [Repositories](#repositories)
8. [Services](#services)
9. [Filters](#filters)
10. [How to Build This Project](#how-to-build-this-project)
11. [Testing](#testing)
12. [Project Extensions](#project-extensions)
13. [SOLID Principles Quick Reference](#solid-principles-quick-reference)

---

## Project Overview

This project is a **Task Management System** built as a practical exercise for learning and applying SOLID principles in real-world software development. It is similar in concept to tools like Trello or Todoist, but intentionally simplified to focus on clean architecture and design principles rather than feature complexity.

The system allows users to:

- Create, update, and delete tasks
- Organize tasks into projects
- Assign priorities and due dates to tasks
- Filter tasks by priority, status, due date, or whether they are overdue
- Export tasks in multiple formats such as JSON, CSV, and Markdown
- Receive notifications through different channels when tasks are created, completed, or due

Every architectural decision in this project is made with SOLID principles in mind. Each class has a single, clearly defined job. New features can be added without modifying existing code. Dependencies are injected through interfaces rather than hardcoded. The result is a codebase that is easy to understand, easy to test, and easy to extend.

---

## Features

- **Task Management** — Create, read, update, and delete tasks with titles, descriptions, priorities, statuses, and due dates.
- **Project Organization** — Group tasks into named projects for better organization.
- **Priority Levels** — Assign tasks a priority of Low, Medium, or High.
- **Task Statuses** — Track tasks through the lifecycle of Todo, In Progress, and Done.
- **Due Date Tracking** — Set due dates and automatically detect overdue tasks.
- **Filtering System** — Filter tasks by priority, status, due date range, or overdue status. Combine multiple filters together.
- **Export System** — Export tasks to JSON, CSV, or Markdown format. New export formats can be added without changing any existing code.
- **Notification System** — Receive notifications via the console, email, or Slack when tasks are created, completed, or approaching their due date. New notification channels can be added without changing any existing code.
- **Swappable Storage** — Store tasks in memory during a session or persist them to a JSON file on disk. The rest of the application does not need to know which storage method is in use.

---

## Project Structure

```
task-management-system/
├── src/
│   ├── models/                          # Data models (SRP)
│   │   ├── Task.ts                      # Represents a single task
│   │   ├── Project.ts                   # Represents a project
│   │   └── User.ts                      # Represents a user
│   ├── interfaces/                      # Abstractions (DIP + ISP)
│   │   ├── IRepository.ts               # Repository contracts
│   │   ├── INotificationService.ts      # Notification contract
│   │   ├── IExportService.ts            # Export contract
│   │   └── ITaskFilter.ts               # Filter contract
│   ├── repositories/                    # Data storage (SRP + LSP)
│   │   ├── InMemoryTaskRepository.ts    # Stores tasks in memory
│   │   ├── FileTaskRepository.ts        # Stores tasks in a JSON file
│   │   └── InMemoryProjectRepository.ts # Stores projects in memory
│   ├── services/                        # Business logic (SRP + DIP)
│   │   ├── TaskService.ts               # Orchestrates task operations
│   │   ├── ProjectService.ts            # Orchestrates project operations
│   │   ├── ConsoleNotificationService.ts
│   │   ├── EmailNotificationService.ts
│   │   ├── SlackNotificationService.ts
│   │   ├── JSONExportService.ts
│   │   ├── CSVExportService.ts
│   │   └── MarkdownExportService.ts
│   ├── filters/                         # Task filters (OCP)
│   │   ├── PriorityFilter.ts
│   │   ├── StatusFilter.ts
│   │   ├── DueDateFilter.ts
│   │   └── OverdueFilter.ts
│   └── main.ts                          # Application entry point
├── package.json
└── tsconfig.json
```

Each folder has a clear and distinct purpose. Models hold data. Interfaces define contracts. Repositories handle storage. Services contain business logic. Filters handle task querying. Nothing overlaps. Nothing does more than one job.

---

## SOLID Principles

SOLID is an acronym for five design principles that guide the development of maintainable, flexible, and understandable object-oriented software. Each letter stands for one principle, and each principle is demonstrated throughout this project.

---

### Single Responsibility Principle (SRP)

> **"A class should have only one reason to change."**

Every class in this project does exactly one thing. If you need to change how tasks are stored, you only touch the repository. If you need to change how notifications are sent, you only touch the notification service. No single file contains logic from two different concerns.

**How it applies in this project:**

| Class | Single Responsibility |
|---|---|
| `Task` | Represents task data and manages its own state |
| `TaskRepository` | Handles reading and writing tasks to storage |
| `TaskService` | Orchestrates task-related operations |
| `EmailNotificationService` | Sends notifications via email |
| `JSONExportService` | Exports tasks in JSON format |
| `PriorityFilter` | Filters tasks by priority |

**Example — What NOT to do:**

```typescript
// ❌ BAD: One class doing everything
class User {
  // Responsibility 1: User data
  updateEmail(newEmail: string): void { /* ... */ }

  // Responsibility 2: Database operations
  save(): void { /* ... */ }

  // Responsibility 3: Sending emails
  sendWelcomeEmail(): void { /* ... */ }

  // Responsibility 4: Logging
  log(message: string): void { /* ... */ }
}
// This class has 4 reasons to change. That is 4 things that could break.
```

**Example — What TO do:**

```typescript
// ✅ GOOD: Each class does one thing
class User {
  updateEmail(newEmail: string): void { /* ... */ }
}

class UserRepository {
  save(user: User): void { /* ... */ }
}

class EmailService {
  sendWelcomeEmail(user: User): void { /* ... */ }
}

class Logger {
  log(message: string): void { /* ... */ }
}
// Each class has exactly 1 reason to change.
```

---

### Open/Closed Principle (OCP)

> **"Classes should be open for extension but closed for modification."**

You should be able to add new functionality to your system without editing existing, working code. You extend it by adding new classes, not by rewriting old ones.

**How it applies in this project:**

This project has three systems that are open for extension:

1. **Filters** — To add a new way to filter tasks (for example, filtering by tag), you create a new class that implements `ITaskFilter`. You do not touch `TaskService` or any existing filter.

2. **Export Formats** — To add a new export format (for example, XML), you create a new class that implements `IExportService`. Nothing else changes.

3. **Notification Channels** — To add a new notification channel (for example, SMS), you create a new class that implements `INotificationService`. Nothing else changes.

**Example:**

```typescript
// The interface is already defined. It never changes.
interface IExportService {
  export(tasks: Task[]): string;
  getFileExtension(): string;
}

// ✅ Adding a NEW export format requires ZERO changes to existing code.
// Just create a new class:
class XMLExportService implements IExportService {
  export(tasks: Task[]): string {
    // XML export logic here
    return '<tasks>...</tasks>';
  }

  getFileExtension(): string {
    return '.xml';
  }
}

// That is it. No existing file was modified. The new format just works.
```

---

### Liskov Substitution Principle (LSP)

> **"Objects of a subclass should be replaceable with objects of its superclass without altering the correctness of the program."**

If your code expects a certain type, any implementation of that type should work correctly in its place. You should never have to ask "what type is this actually?" when using it.

**How it applies in this project:**

The two repository implementations demonstrate this clearly. `TaskService` expects an `ITaskRepository`. It does not care whether that repository stores data in memory or writes it to a file. Both work correctly in all situations.

```typescript
// TaskService only knows about the interface
class TaskService {
  constructor(private taskRepository: ITaskRepository) {}

  createTask(/* ... */): Task {
    // Works identically whether taskRepository is
    // InMemoryTaskRepository or FileTaskRepository
    this.taskRepository.save(task);
    return task;
  }
}

// Usage — swap freely, behavior stays the same
const inMemoryService = new TaskService(new InMemoryTaskRepository());
const fileService    = new TaskService(new FileTaskRepository('./tasks.json'));

// Both create tasks. Both save them. Both work correctly.
// TaskService does not know or care which one it is using.
```

**A common LSP violation to avoid:**

```typescript
// ❌ BAD: Penguin is a Bird, but cannot fly. This breaks LSP.
class Bird {
  fly(): void { console.log("Flying"); }
}

class Penguin extends Bird {
  fly(): void { throw new Error("Penguins cannot fly!"); }
}

// Any function expecting a Bird will crash if given a Penguin.

// ✅ GOOD: Use interfaces for specific capabilities
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }

class Sparrow implements Flyable { fly(): void { /* ... */ } }
class Penguin implements Swimmable { swim(): void { /* ... */ } }
// Now nothing assumes a bird can fly unless it explicitly implements Flyable.
```

---

### Interface Segregation Principle (ISP)

> **"Clients should not be forced to depend on interfaces they do not use."**

Interfaces should be small and focused. A class should never be forced to implement a method that has nothing to do with what it actually does.

**How it applies in this project:**

Instead of one large interface like `IService` that contains methods for notifications, exports, filtering, and storage all at once, this project splits responsibilities into small, focused interfaces:

| Interface | Methods | Purpose |
|---|---|---|
| `ITaskRepository` | `save`, `findById`, `findAll`, `update`, `delete`, `findByProjectId`, `findByStatus` | Task storage only |
| `INotificationService` | `notifyTaskCreated`, `notifyTaskCompleted`, `notifyTaskDue` | Notifications only |
| `IExportService` | `export`, `getFileExtension` | Exporting only |
| `ITaskFilter` | `filter` | Filtering only |

Each interface is small. Each class only implements the interfaces relevant to what it does. Nothing is forced to implement methods it does not need.

**Example — What NOT to do:**

```typescript
// ❌ BAD: Fat interface forces irrelevant implementations
interface Worker {
  work(): void;
  eat(): void;       // Robots do not eat
  sleep(): void;     // Robots do not sleep
  getSalary(): number; // Robots are not paid
}

class RobotWorker implements Worker {
  work(): void { console.log("Working"); }
  eat(): void { throw new Error("Robots do not eat!"); }      // Forced!
  sleep(): void { throw new Error("Robots do not sleep!"); }  // Forced!
  getSalary(): number { return 0; }                            // Meaningless
}
```

**Example — What TO do:**

```typescript
// ✅ GOOD: Small, focused interfaces
interface Workable { work(): void; }
interface Eatable { eat(): void; }
interface Payable { getSalary(): number; }

class HumanWorker implements Workable, Eatable, Payable {
  work(): void { /* ... */ }
  eat(): void { /* ... */ }
  getSalary(): number { return 50000; }
}

class RobotWorker implements Workable {
  work(): void { /* ... */ }
  // Only implements what it actually does. Clean and correct.
}
```

---

### Dependency Inversion Principle (DIP)

> **"High-level modules should not depend on low-level modules. Both should depend on abstractions."**

Instead of a service directly creating and using a specific implementation (like `new MySQLDatabase()`), it should receive that implementation through its constructor via an interface. This makes the code flexible, testable, and loosely coupled.

**How it applies in this project:**

`TaskService` is a high-level module. It orchestrates task creation, completion, notification, and export. It does not create its own repository or notification service. Instead, it receives them through its constructor as interfaces.

```typescript
// ❌ BAD: High-level module creates its own dependencies
class TaskService {
  private repository = new MySQLTaskRepository(); // Hardcoded!
  private notifier  = new EmailNotificationService(); // Hardcoded!

  // Cannot swap to PostgreSQL or SMS without editing this file.
  // Cannot test without a real database and email server.
}

// ✅ GOOD: Dependencies are injected through interfaces
class TaskService {
  constructor(
    private taskRepository: ITaskRepository,         // Interface, not concrete class
    private notificationService: INotificationService // Interface, not concrete class
  ) {}

  // Works with ANY repository and ANY notification service.
  // Easy to test with mocks. Easy to swap implementations.
}

// Wiring happens outside the service, at the application level:
const taskService = new TaskService(
  new InMemoryTaskRepository(),       // Could be FileTaskRepository
  new ConsoleNotificationService()    // Could be EmailNotificationService
);
```

---

## Models

Models are the foundation of the application. They represent the core data and manage their own state. They do not interact with databases, send notifications, or perform any other external operation. They simply hold data and provide methods to change that data.

### Task

`Task` is the central model. It represents a single unit of work.

```typescript
// src/models/Task.ts

export enum Priority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done"
}

export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public priority: Priority,
    public status: TaskStatus,
    public dueDate: Date | null,
    public projectId: string | null,
    public createdAt: Date = new Date(),
    public completedAt: Date | null = null
  ) {}

  markAsComplete(): void {
    this.status = TaskStatus.DONE;
    this.completedAt = new Date();
  }

  markAsInProgress(): void {
    this.status = TaskStatus.IN_PROGRESS;
  }

  isOverdue(): boolean {
    if (!this.dueDate || this.status === TaskStatus.DONE) return false;
    return new Date() > this.dueDate;
  }

  updateTitle(newTitle: string): void {
    this.title = newTitle;
  }

  updateDescription(newDescription: string): void {
    this.description = newDescription;
  }

  updatePriority(newPriority: Priority): void {
    this.priority = newPriority;
  }

  updateDueDate(newDueDate: Date | null): void {
    this.dueDate = newDueDate;
  }
}
```

### Project

`Project` represents a named group that tasks can belong to.

```typescript
// src/models/Project.ts

export class Project {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public createdAt: Date = new Date()
  ) {}

  updateName(newName: string): void {
    this.name = newName;
  }

  updateDescription(newDescription: string): void {
    this.description = newDescription;
  }
}
```

### User

`User` represents the person using the application.

```typescript
// src/models/User.ts

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string
  ) {}
}
```

---

## Interfaces

Interfaces are the contracts that make SOLID work. They define what a class must do without specifying how it does it. Every major component in this project is built around an interface.

### IRepository

Defines how data is stored and retrieved. The application never cares whether data lives in memory, in a file, or in a database. It only cares that it can save, find, update, and delete.

```typescript
// src/interfaces/IRepository.ts
import { Task } from '../models/Task';
import { Project } from '../models/Project';

export interface ITaskRepository {
  save(task: Task): void;
  findById(id: string): Task | null;
  findAll(): Task[];
  update(task: Task): void;
  delete(id: string): void;
  findByProjectId(projectId: string): Task[];
  findByStatus(status: string): Task[];
}

export interface IProjectRepository {
  save(project: Project): void;
  findById(id: string): Project | null;
  findAll(): Project[];
  update(project: Project): void;
  delete(id: string): void;
}
```

### INotificationService

Defines how notifications are sent. The application does not care whether notifications go to the console, an email inbox, or a Slack channel.

```typescript
// src/interfaces/INotificationService.ts
import { Task } from '../models/Task';

export interface INotificationService {
  notifyTaskCreated(task: Task): void;
  notifyTaskCompleted(task: Task): void;
  notifyTaskDue(task: Task): void;
}
```

### IExportService

Defines how tasks are exported. Each implementation produces a different output format.

```typescript
// src/interfaces/IExportService.ts
import { Task } from '../models/Task';

export interface IExportService {
  export(tasks: Task[]): string;
  getFileExtension(): string;
}
```

### ITaskFilter

Defines how tasks are filtered. Each implementation applies a different filtering rule.

```typescript
// src/interfaces/ITaskFilter.ts
import { Task } from '../models/Task';

export interface ITaskFilter {
  filter(tasks: Task[]): Task[];
}
```

---

## Repositories

Repositories are responsible for one thing: persisting and retrieving data. They implement `ITaskRepository` or `IProjectRepository`. The rest of the application interacts with them through those interfaces and never knows which concrete class is actually being used.

### InMemoryTaskRepository

Stores tasks in a `Map` inside memory. Data is lost when the application closes. Useful for development, testing, and quick demos.

```typescript
// src/repositories/InMemoryTaskRepository.ts
import { Task } from '../models/Task';
import { ITaskRepository } from '../interfaces/IRepository';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Map<string, Task> = new Map();

  save(task: Task): void {
    this.tasks.set(task.id, task);
    console.log(`✅ Task "${task.title}" saved`);
  }

  findById(id: string): Task | null {
    return this.tasks.get(id) || null;
  }

  findAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  update(task: Task): void {
    if (this.tasks.has(task.id)) {
      this.tasks.set(task.id, task);
      console.log(`✅ Task "${task.title}" updated`);
    }
  }

  delete(id: string): void {
    const task = this.tasks.get(id);
    if (task) {
      this.tasks.delete(id);
      console.log(`🗑️ Task "${task.title}" deleted`);
    }
  }

  findByProjectId(projectId: string): Task[] {
    return this.findAll().filter(task => task.projectId === projectId);
  }

  findByStatus(status: string): Task[] {
    return this.findAll().filter(task => task.status === status);
  }
}
```

### FileTaskRepository

Stores tasks in a JSON file on disk. Data persists across sessions. Demonstrates LSP — it can replace `InMemoryTaskRepository` anywhere without the rest of the code knowing.

```typescript
// src/repositories/FileTaskRepository.ts
import * as fs from 'fs';
import { Task } from '../models/Task';
import { ITaskRepository } from '../interfaces/IRepository';

export class FileTaskRepository implements ITaskRepository {
  private filePath: string;

  constructor(filePath: string = './tasks.json') {
    this.filePath = filePath;
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  private readTasks(): Task[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    const tasksData = JSON.parse(data);
    return tasksData.map((t: any) =>
      new Task(
        t.id, t.title, t.description, t.priority, t.status,
        t.dueDate ? new Date(t.dueDate) : null,
        t.projectId,
        new Date(t.createdAt),
        t.completedAt ? new Date(t.completedAt) : null
      )
    );
  }

  private writeTasks(tasks: Task[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(tasks, null, 2));
  }

  save(task: Task): void {
    const tasks = this.readTasks();
    tasks.push(task);
    this.writeTasks(tasks);
    console.log(`✅ Task "${task.title}" saved to file`);
  }

  findById(id: string): Task | null {
    return this.readTasks().find(t => t.id === id) || null;
  }

  findAll(): Task[] {
    return this.readTasks();
  }

  update(task: Task): void {
    const tasks = this.readTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.writeTasks(tasks);
      console.log(`✅ Task "${task.title}" updated in file`);
    }
  }

  delete(id: string): void {
    const tasks = this.readTasks().filter(t => t.id !== id);
    this.writeTasks(tasks);
    console.log(`🗑️ Task deleted from file`);
  }

  findByProjectId(projectId: string): Task[] {
    return this.findAll().filter(task => task.projectId === projectId);
  }

  findByStatus(status: string): Task[] {
    return this.findAll().filter(task => task.status === status);
  }
}
```

### InMemoryProjectRepository

Stores projects in memory. Follows the same pattern as `InMemoryTaskRepository`.

```typescript
// src/repositories/InMemoryProjectRepository.ts
import { Project } from '../models/Project';
import { IProjectRepository } from '../interfaces/IRepository';

export class InMemoryProjectRepository implements IProjectRepository {
  private projects: Map<string, Project> = new Map();

  save(project: Project): void {
    this.projects.set(project.id, project);
    console.log(`✅ Project "${project.name}" saved`);
  }

  findById(id: string): Project | null {
    return this.projects.get(id) || null;
  }

  findAll(): Project[] {
    return Array.from(this.projects.values());
  }

  update(project: Project): void {
    if (this.projects.has(project.id)) {
      this.projects.set(project.id, project);
      console.log(`✅ Project "${project.name}" updated`);
    }
  }

  delete(id: string): void {
    const project = this.projects.get(id);
    if (project) {
      this.projects.delete(id);
      console.log(`🗑️ Project "${project.name}" deleted`);
    }
  }
}
```

---

## Services

Services contain the business logic of the application. They depend on interfaces, not concrete classes. They are injected with their dependencies through their constructors.

### TaskService

The main service. It orchestrates task creation, updates, completion, filtering, exporting, and due-date checking. It depends on `ITaskRepository` and `INotificationService` — it does not know or care which concrete classes back those interfaces.

```typescript
// src/services/TaskService.ts
import { Task, Priority, TaskStatus } from '../models/Task';
import { ITaskRepository } from '../interfaces/IRepository';
import { INotificationService } from '../interfaces/INotificationService';
import { IExportService } from '../interfaces/IExportService';
import { ITaskFilter } from '../interfaces/ITaskFilter';

export class TaskService {
  constructor(
    private taskRepository: ITaskRepository,
    private notificationService: INotificationService
  ) {}

  createTask(
    title: string,
    description: string,
    priority: Priority,
    dueDate: Date | null,
    projectId: string | null
  ): Task {
    const task = new Task(
      this.generateId(), title, description,
      priority, TaskStatus.TODO, dueDate, projectId
    );

    this.taskRepository.save(task);
    this.notificationService.notifyTaskCreated(task);
    return task;
  }

  completeTask(taskId: string): void {
    const task = this.taskRepository.findById(taskId);
    if (!task) { console.log('❌ Task not found'); return; }

    task.markAsComplete();
    this.taskRepository.update(task);
    this.notificationService.notifyTaskCompleted(task);
  }

  updateTask(taskId: string, updates: Partial<Task>): void {
    const task = this.taskRepository.findById(taskId);
    if (!task) { console.log('❌ Task not found'); return; }

    if (updates.title)       task.updateTitle(updates.title);
    if (updates.description) task.updateDescription(updates.description);
    if (updates.priority)    task.updatePriority(updates.priority);
    if (updates.dueDate !== undefined) task.updateDueDate(updates.dueDate);

    this.taskRepository.update(task);
  }

  deleteTask(taskId: string): void {
    this.taskRepository.delete(taskId);
  }

  getAllTasks(): Task[] {
    return this.taskRepository.findAll();
  }

  getTaskById(taskId: string): Task | null {
    return this.taskRepository.findById(taskId);
  }

  getTasksByProject(projectId: string): Task[] {
    return this.taskRepository.findByProjectId(projectId);
  }

  // OCP: Accepts any filter. New filters require no changes here.
  filterTasks(filter: ITaskFilter): Task[] {
    return filter.filter(this.getAllTasks());
  }

  // OCP: Accepts multiple filters. Applies them in sequence.
  filterTasksWithMultiple(filters: ITaskFilter[]): Task[] {
    let tasks = this.getAllTasks();
    filters.forEach(filter => { tasks = filter.filter(tasks); });
    return tasks;
  }

  // OCP: Accepts any export service. New formats require no changes here.
  exportTasks(exportService: IExportService, tasks?: Task[]): string {
    return exportService.export(tasks || this.getAllTasks());
  }

  checkDueTasks(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.getAllTasks().forEach(task => {
      if (task.dueDate && task.status !== TaskStatus.DONE) {
        if (new Date(task.dueDate).toDateString() === tomorrow.toDateString()) {
          this.notificationService.notifyTaskDue(task);
        }
      }
    });
  }

  private generateId(): string {
    return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

### ProjectService

Manages project CRUD operations. Follows the same dependency injection pattern as `TaskService`.

```typescript
// src/services/ProjectService.ts
import { Project } from '../models/Project';
import { IProjectRepository } from '../interfaces/IRepository';

export class ProjectService {
  constructor(private projectRepository: IProjectRepository) {}

  createProject(name: string, description: string): Project {
    const project = new Project(this.generateId(), name, description);
    this.projectRepository.save(project);
    return project;
  }

  updateProject(projectId: string, updates: Partial<Project>): void {
    const project = this.projectRepository.findById(projectId);
    if (!project) { console.log('❌ Project not found'); return; }

    if (updates.name)        project.updateName(updates.name);
    if (updates.description) project.updateDescription(updates.description);

    this.projectRepository.update(project);
  }

  deleteProject(projectId: string): void {
    this.projectRepository.delete(projectId);
  }

  getAllProjects(): Project[] {
    return this.projectRepository.findAll();
  }

  getProjectById(projectId: string): Project | null {
    return this.projectRepository.findById(projectId);
  }

  private generateId(): string {
    return `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

### Notification Services

Three implementations of `INotificationService`. Each sends notifications through a different channel. Adding a new channel means adding a new class — nothing else changes.

```typescript
// src/services/ConsoleNotificationService.ts
import { Task } from '../models/Task';
import { INotificationService } from '../interfaces/INotificationService';

export class ConsoleNotificationService implements INotificationService {
  notifyTaskCreated(task: Task): void {
    console.log(`🔔 New task created: "${task.title}"`);
  }

  notifyTaskCompleted(task: Task): void {
    console.log(`🎉 Task completed: "${task.title}"`);
  }

  notifyTaskDue(task: Task): void {
    console.log(`⏰ Reminder: "${task.title}" is due soon!`);
  }
}
```

```typescript
// src/services/EmailNotificationService.ts
import { Task } from '../models/Task';
import { INotificationService } from '../interfaces/INotificationService';

export class EmailNotificationService implements INotificationService {
  notifyTaskCreated(task: Task): void {
    console.log(`📧 Email sent: Task "${task.title}" has been created`);
  }

  notifyTaskCompleted(task: Task): void {
    console.log(`📧 Email sent: Task "${task.title}" is complete`);
  }

  notifyTaskDue(task: Task): void {
    console.log(`📧 Email sent: Task "${task.title}" is due soon`);
  }
}
```

```typescript
// src/services/SlackNotificationService.ts
import { Task } from '../models/Task';
import { INotificationService } from '../interfaces/INotificationService';

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
```

### Export Services

Three implementations of `IExportService`. Each produces a different output format.

```typescript
// src/services/JSONExportService.ts
import { Task } from '../models/Task';
import { IExportService } from '../interfaces/IExportService';

export class JSONExportService implements IExportService {
  export(tasks: Task[]): string {
    return JSON.stringify(tasks, null, 2);
  }

  getFileExtension(): string {
    return '.json';
  }
}
```

```typescript
// src/services/CSVExportService.ts
import { Task } from '../models/Task';
import { IExportService } from '../interfaces/IExportService';

export class CSVExportService implements IExportService {
  export(tasks: Task[]): string {
    if (tasks.length === 0) return '';

    const headers = 'ID,Title,Description,Priority,Status,Due Date,Created At\n';
    const rows = tasks.map(task =>
      `${task.id},"${task.title}","${task.description}",${task.priority},${task.status},${task.dueDate || 'N/A'},${task.createdAt}`
    ).join('\n');

    return headers + rows;
  }

  getFileExtension(): string {
    return '.csv';
  }
}
```

```typescript
// src/services/MarkdownExportService.ts
import { Task } from '../models/Task';
import { IExportService } from '../interfaces/IExportService';

export class MarkdownExportService implements IExportService {
  export(tasks: Task[]): string {
    let markdown = '# Tasks\n\n';

    tasks.forEach(task => {
      const checkbox = task.status === 'done' ? '[x]' : '[ ]';
      markdown += `## ${checkbox} ${task.title}\n\n`;
      markdown += `- **Priority:** ${task.priority}\n`;
      markdown += `- **Status:** ${task.status}\n`;
      if (task.dueDate) markdown += `- **Due Date:** ${task.dueDate.toLocaleDateString()}\n`;
      markdown += `\n${task.description}\n\n---\n\n`;
    });

    return markdown;
  }

  getFileExtension(): string {
    return '.md';
  }
}
```

---

## Filters

Filters implement `ITaskFilter`. Each one applies a different filtering rule to a list of tasks. They can be used individually or combined. Adding a new filter means adding a new class — `TaskService` does not need to change.

```typescript
// src/filters/PriorityFilter.ts
import { Task, Priority } from '../models/Task';
import { ITaskFilter } from '../interfaces/ITaskFilter';

export class PriorityFilter implements ITaskFilter {
  constructor(private priority: Priority) {}

  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => task.priority === this.priority);
  }
}
```

```typescript
// src/filters/StatusFilter.ts
import { Task, TaskStatus } from '../models/Task';
import { ITaskFilter } from '../interfaces/ITaskFilter';

export class StatusFilter implements ITaskFilter {
  constructor(private status: TaskStatus) {}

  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => task.status === this.status);
  }
}
```

```typescript
// src/filters/DueDateFilter.ts
import { Task } from '../models/Task';
import { ITaskFilter } from '../interfaces/ITaskFilter';

export class DueDateFilter implements ITaskFilter {
  constructor(private startDate: Date, private endDate: Date) {}

  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      return task.dueDate >= this.startDate && task.dueDate <= this.endDate;
    });
  }
}
```

```typescript
// src/filters/OverdueFilter.ts
import { Task } from '../models/Task';
import { ITaskFilter } from '../interfaces/ITaskFilter';

export class OverdueFilter implements ITaskFilter {
  filter(tasks: Task[]): Task[] {
    return tasks.filter(task => task.isOverdue());
  }
}
```

---

## How to Build This Project

Build this project incrementally. Each phase adds complexity and introduces new SOLID principles naturally.

### Phase 1 — Core Foundation

Start here. Get basic task operations working with a single in-memory repository.

- Create the `Task` model with its enums and methods
- Create the `Project` model
- Create the `ITaskRepository` interface
- Implement `InMemoryTaskRepository`
- Create `TaskService` that depends on `ITaskRepository`
- Write a `main.ts` that creates tasks, updates them, and prints them out

**SOLID focus:** SRP (each class does one thing), DIP (TaskService depends on the interface)

### Phase 2 — Swappable Storage

Add a second repository implementation to prove that the system works regardless of how data is stored.

- Implement `FileTaskRepository`
- In `main.ts`, swap `InMemoryTaskRepository` for `FileTaskRepository`
- Verify that everything works without changing `TaskService`

**SOLID focus:** LSP (both repositories are interchangeable), OCP (new storage added without modifying existing code)

### Phase 3 — Notifications

Add a notification system that fires when tasks are created or completed.

- Create the `INotificationService` interface
- Implement `ConsoleNotificationService`
- Inject `INotificationService` into `TaskService`
- Add notification calls to `createTask` and `completeTask`
- Add `EmailNotificationService` and `SlackNotificationService`
- Swap notification services in `main.ts` to verify they work

**SOLID focus:** ISP (small focused interface), OCP (new channels without modifying TaskService), DIP (injected through interface)

### Phase 4 — Filtering

Add a flexible filtering system that can be extended without modifying existing code.

- Create the `ITaskFilter` interface
- Implement `PriorityFilter`, `StatusFilter`, `DueDateFilter`, and `OverdueFilter`
- Add `filterTasks` and `filterTasksWithMultiple` methods to `TaskService`
- Demonstrate combining multiple filters in `main.ts`

**SOLID focus:** OCP (new filters added by creating new classes only)

### Phase 5 — Exporting

Add the ability to export tasks in different formats.

- Create the `IExportService` interface
- Implement `JSONExportService`, `CSVExportService`, and `MarkdownExportService`
- Add `exportTasks` method to `TaskService`
- Demonstrate exporting in all formats in `main.ts`

**SOLID focus:** OCP (new formats by adding new classes), SRP (each exporter does one thing)

---

## Testing

SOLID principles make testing significantly easier. Because every dependency is injected through an interface, you can replace real implementations with mocks in tests.

```typescript
// Mock repository — records what was saved, returns predictable data
class MockTaskRepository implements ITaskRepository {
  public savedTasks: Task[] = [];

  save(task: Task): void {
    this.savedTasks.push(task);
  }

  findById(id: string): Task | null {
    return this.savedTasks.find(t => t.id === id) || null;
  }

  findAll(): Task[] {
    return this.savedTasks;
  }

  update(task: Task): void {
    const index = this.savedTasks.findIndex(t => t.id === task.id);
    if (index !== -1) this.savedTasks[index] = task;
  }

  delete(id: string): void {
    this.savedTasks = this.savedTasks.filter(t => t.id !== id);
  }

  findByProjectId(projectId: string): Task[] {
    return this.savedTasks.filter(t => t.projectId === projectId);
  }

  findByStatus(status: string): Task[] {
    return this.savedTasks.filter(t => t.status === status);
  }
}

// Mock notification service — records what was notified
class MockNotificationService implements INotificationService {
  public notifications: string[] = [];

  notifyTaskCreated(task: Task): void {
    this.notifications.push(`created:${task.title}`);
  }

  notifyTaskCompleted(task: Task): void {
    this.notifications.push(`completed:${task.title}`);
  }

  notifyTaskDue(task: Task): void {
    this.notifications.push(`due:${task.title}`);
  }
}

// Tests
function runTests(): void {
  console.log('Running tests...\n');

  // Test 1: Creating a task saves it and triggers a notification
  const mockRepo = new MockTaskRepository();
  const mockNotifier = new MockNotificationService();
  const service = new TaskService(mockRepo, mockNotifier);

  service.createTask('Buy groceries', 'Milk, eggs, bread', Priority.LOW, null, null);

  console.assert(mockRepo.savedTasks.length === 1, 'Test 1a failed: Task was not saved');
  console.assert(mockNotifier.notifications.length === 1, 'Test 1b failed: Notification was not sent');
  console.assert(mockNotifier.notifications[0].startsWith('created:'), 'Test 1c failed: Wrong notification type');
  console.log('✅ Test 1 passed: Task creation saves and notifies');

  // Test 2: Completing a task updates status and triggers a notification
  const task = mockRepo.savedTasks[0];
  service.completeTask(task.id);

  console.assert(task.status === TaskStatus.DONE, 'Test 2a failed: Status not updated');
  console.assert(mockNotifier.notifications.length === 2, 'Test 2b failed: Completion notification not sent');
  console.log('✅ Test 2 passed: Task completion updates status and notifies');

  // Test 3: Filtering by priority returns correct tasks
  const mockRepo2 = new MockTaskRepository();
  const service2 = new TaskService(mockRepo2, new MockNotificationService());

  service2.createTask('High task', '', Priority.HIGH, null, null);
  service2.createTask('Low task', '', Priority.LOW, null, null);
  service2.createTask('Another high', '', Priority.HIGH, null, null);

  const highTasks = service2.filterTasks(new PriorityFilter(Priority.HIGH));
  console.assert(highTasks.length === 2, 'Test 3 failed: Wrong number of high priority tasks');
  console.log('✅ Test 3 passed: Priority filter returns correct results');

  console.log('\n🎉 All tests passed!');
}

runTests();
```

---

## Project Extensions

Once you have completed the core project, here are ways to expand it and continue practicing clean architecture:

| Extension | What it adds | Skills practiced |
|---|---|---|
| **CLI Interface** | Use `commander` or `inquirer` to build an interactive command-line menu | UX design, input validation |
| **REST API** | Wrap the services in Express routes | HTTP, routing, middleware |
| **Real Database** | Replace file storage with SQLite or PostgreSQL | SQL, connection pooling, migrations |
| **Authentication** | Add user login with JWT tokens | Security, token handling |
| **Web Frontend** | Build a React or Vue UI that calls the API | Frontend frameworks, state management |
| **Real Notifications** | Use SendGrid for email, Twilio for SMS | Third-party APIs, webhooks |
| **Task Scheduling** | Use cron jobs to check due tasks automatically | Background jobs, scheduling |
| **Analytics** | Track completion rates, productivity over time | Data aggregation, reporting |
| **Task Tags** | Add labels to tasks, filter by tag | Many-to-many relationships |
| **Recurring Tasks** | Tasks that repeat on a schedule | Date logic, task cloning |

Each extension follows the same SOLID approach: define an interface, implement it, inject it.

---

## SOLID Principles Quick Reference

| Principle | Rule | How to Remember | Applied In This Project |
|---|---|---|---|
| **S** — Single Responsibility | One class, one job | "A chef cooks. A waiter serves." | Every class has one clear purpose |
| **O** — Open/Closed | Extend without modifying | "Add apps to a phone, don't rebuild it" | Filters, exporters, and notifiers are all extensible |
| **L** — Liskov Substitution | Subclasses must work anywhere the parent works | "Any USB device works in any USB port" | `FileTaskRepository` replaces `InMemoryTaskRepository` seamlessly |
| **I** — Interface Segregation | Small interfaces, not fat ones | "Use a scalpel, not a Swiss army knife" | `INotificationService`, `IExportService`, and `ITaskFilter` are all small and focused |
| **D** — Dependency Inversion | Depend on abstractions, not concrete classes | "Your lamp does not care which power company provides electricity" | All services receive dependencies through interfaces via constructor injection |
