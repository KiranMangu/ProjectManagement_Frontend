export class Task {
    task: String;
    startDate: Date;
    endDate: Date;
    status: String;
    priority: Number;
    projectId: String;
    parentId: String;

    // constructor(init?: Partial<Task>) {
    //     Object.assign(this, init);
    // }
    constructor(controlObject: any) {
        this.task = controlObject.task;
        this.startDate = controlObject.startDate === undefined ? undefined : new Date(new Date(controlObject.startDate).toISOString());
        this.endDate = controlObject.endDate === undefined ? undefined : new Date(new Date(controlObject.endDate).toISOString());
        this.priority = controlObject.priority;
        this.status = controlObject.status;
        this.projectId = controlObject.projectId;
        this.parentId = controlObject.parentTaskId;
    }
}

export class TaskView {
    task: String;
    startDate: Date;
    endDate: Date;
    status: String;
    priority: Number;
    // projectId: String;
    parentId: String;
    // parentTask: String;
}

export class ParentTask {
    parentTask: String;

    constructor(parentTask: String) {
        this.parentTask = parentTask;
    }
}
