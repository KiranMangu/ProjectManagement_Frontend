import * as userModel from './user.model';
import * as taskModel from './task.model';
import * as projectModel from './project.model';

export const usersData: userModel.User[] = [
    // { employeeId: '1', lastName: 'Hydrogen', firstName: 'H' },
    // { employeeId: '2', lastName: 'Helium', firstName: 'He' },
    // { employeeId: '3', lastName: 'Lithium', firstName: 'Li' },
    // { employeeId: '4', lastName: 'Beryllium', firstName: 'Be' },
    // { employeeId: '5', lastName: 'Boron', firstName: 'B' },
    // { employeeId: '6', lastName: 'Carbon', firstName: 'C' },
    // { employeeId: '7', lastName: 'Nitrogen', firstName: 'N' },
    // { employeeId: '8', lastName: 'Oxygen', firstName: 'O' },
    // { employeeId: '9', lastName: 'Fluorine', firstName: 'F' }
];


export const projectData: projectModel.ProjectList[] = [
    {
        project: 'Test Project 1', noOfTasks: 2, startDate: new Date('01/01/2019'),
        endDate: new Date('02/01/2019'), priority: 29, status: 'Open'
    },
    {
        project: 'Test Project 2', noOfTasks: 2, startDate: new Date('02/01/2019'),
        endDate: new Date('03/01/2019'), priority: 1, status: 'In-progress'
    },
    {
        project: 'Test Project 3', noOfTasks: 2, startDate: new Date('03/01/2019'),
        endDate: new Date('04/01/2019'), priority: 7, status: 'Completed'
    },
];
