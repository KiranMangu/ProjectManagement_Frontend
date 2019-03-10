export interface Project {
    projectId: String;
    project: String;
    startDate: Date;
    endDate: Date;
    priority: Number;
    status: String;
    manager: String;
}

export interface ProjectList {
    project: String;
    noOfTasks: Number;
    startDate: Date;
    endDate: Date;
    status: String;
    priority: Number;
}
