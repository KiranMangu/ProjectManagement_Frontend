export class User {
    _id: String;
    firstName: String;
    lastName: String;
    employeeId: String;
    projectId: String;
    taskId: String;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}

export enum ButtonActions {
    Submit = 'Submit',
    Update = 'Update',
    Add = 'Add',
    AddTask = 'Add Task',
    UpdateTask = 'Update Task'
}
