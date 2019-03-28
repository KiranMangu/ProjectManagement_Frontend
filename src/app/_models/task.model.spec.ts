import { Task, ParentTask } from './task.model';

describe('Task Model', () => {
    let newTask;
    let newParentTask;
    beforeEach(() => {
        newTask = new Task({
            task: 'testTask',
            startDate: new Date(new Date().toISOString()),
            endDate: new Date(new Date().toISOString()),
            priority: 0,
            status: 'Open',
            projectId: '11',
            parentId: '11'
        });
        const tempTask: String = '';
        newParentTask = new ParentTask(tempTask);
    });

    it('Constructor', () => {
        expect(newTask).toBeTruthy();
    });
});
