export class Project {
    _id: String;
    project: String;
    startDate: Date;
    endDate: Date;
    priority: Number;
    // status: String;
    manager: String;
    public constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}

export class ProjectList {
    _id: String;
    project: String;
    noOfTasks: Number;
    startDate: Date;
    endDate: Date;
    completed: Number = 0;
    priority: Number;
    manager: String;
}
