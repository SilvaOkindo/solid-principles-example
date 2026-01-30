// SRP -> Single Responsibility Principle
// Only functions related to user class are here

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string
    ) {}
}