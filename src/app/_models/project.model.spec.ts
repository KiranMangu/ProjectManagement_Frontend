import { Project, ProjectList } from './project.model';

describe('Project Model', () => {
    let newProject;
    let newProjectList;
    it('Constructor', () => {
        newProject = new Project({
            project: 'project',
            startDate: new Date(),
            endDate: new Date(),
            priority: 0
        });
    });

    it('Default value - ProjectList', () => {
        newProjectList = new ProjectList()
        expect(newProjectList.completed).toEqual(0);
    });
});