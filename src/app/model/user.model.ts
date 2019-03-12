export class User {
    firstName: String;
    lastName: String;
    employeeId: String;
    projectId: String;
    taskId: String;
    
    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
