import { Component } from './Component.js';
import { Project } from '../models/Project.js';
import { Autobind } from '../decorators/Autobind.js';
import { Draggable } from './Draggable.js';

// ProjectItem class

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

    private project: Project;

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
        console.log(event);
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @Autobind
    dragEndHandler(_: DragEvent): void {
        console.log('Drage end')
    }


    attach(): void {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.project.people.toString();
        this.element.querySelector('p')!.textContent = this.project.description;
    }

}