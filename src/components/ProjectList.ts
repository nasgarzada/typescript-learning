import Component from './Component.js';
import { Project } from '../models/Project.js';
import { ProjectStatus } from '../models/enums/ProjectStatus.js';
import Autobind from '../decorators/Autobind.js';
import ProjectState from './ProjectState.js';
import ProjectItem from './ProjectItem.js';
import DragTarget from './DragTarget.js';



// ProjectList class

export default class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProjects: Project[] = [];

    constructor(private type: ProjectStatus) {
        super('project-list', 'app', `${type}-projects`);
        this.configure();
        this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul')!;
            listEl.classList.add('droppable');
        }

    }

    @Autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        ProjectState.getInstance().moveProject(projectId, this.type);
        console.log(event);
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    }


    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';

    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        ProjectState
            .getInstance()
            .addListener((projects: Project[]) => {
                this.assignedProjects = projects.filter(project => {
                    return project.status === this.type;
                });
                this.renderProjects();
            });
    }

    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        this.assignedProjects.forEach(project => {
            new ProjectItem(this.element.querySelector('ul')!.id, project);
        });
    }
}
