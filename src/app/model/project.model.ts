export class Project {
    _id: String;
    project: String;
    startDate: Date;
    endDate: Date;
    priority: Number;
    status: String;
    // manager: String;
    public constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}

export interface ProjectList {
    project: String;
    noOfTasks: Number;
    startDate: Date;
    endDate: Date;
    status: String;
    priority: Number;
}
