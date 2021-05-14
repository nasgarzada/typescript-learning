import { State } from './State.js';
import { Project } from '../models/Project.js';
import { ProjectStatus } from '../models/enums/ProjectStatus.js';

// Project State class

export class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static INSTANCE: ProjectState;

    private constructor() {
        super();
    }

    public static getInstance(): ProjectState {
        if (this.INSTANCE) {
            return this.INSTANCE;
        }
        this.INSTANCE = new ProjectState();
        return this.INSTANCE;
    }

    public addProject(title: string, description: string, numOfPeople: number) {
        const newProject: Project = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople,
            status: ProjectStatus.Active
        };
        this.projects.push(newProject);
        this.updateListeners();

    }

    public moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects
            .find(project => project.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    updateListeners() {
        this.listeners
            .forEach(listenerFunc => {
                listenerFunc(this.projects.slice());
            });
    }

}