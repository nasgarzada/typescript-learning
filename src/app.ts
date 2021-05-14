// validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatable: Validatable): boolean {
    let isValid = true;
    if (validatable.required) {
        isValid = isValid &&
            validatable
                .value
                .toString()
                .trim()
                .length !== 0;
    }
    if (validatable.minLength && typeof validatable.value === 'string') {
        isValid = isValid && validatable.value.trim().length >= validatable.minLength;
    }
    if (validatable.maxLength && typeof validatable.value === 'string') {
        isValid = isValid && validatable.value.trim().length <= validatable.maxLength;
    }
    if (validatable.min && typeof validatable.value === 'number') {
        isValid = isValid && validatable.value >= validatable.min;
    }
    if (validatable.max && typeof validatable.value === 'number') {
        isValid = isValid && validatable.value <= validatable.max;
    }

    return isValid;
}

// NotEmpty decorator function like hibernate validator
function NotEmpty() {
    return function (target: any, propKey: string) {
        let value: string;
        const getter = () => value;
        const setter = (newVal: string) => {
            if (newVal === undefined ||
                newVal === null ||
                newVal.trim().length === 0
            ) {
                Object.defineProperty(target, 'errors', {
                    value: `Value ${newVal} must not be empty`
                });
            } else {
                value = newVal;
            }
        };

        Object.defineProperty(target, propKey, {
            get: getter,
            set: setter
        });
    }
}

//autobind decorator
function Autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;
    console.log('Autobind: ' + originalMethod)
    return {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };
}

interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// Project status enum

enum ProjectStatus {
    Active = 'active', Finished = 'finished'
}

// Project Type
type Project = {
    id: string,
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
}

// Project Listeners
type Listener<T> = (items: T[]) => void

// State base class

abstract class State<T extends {}> {
    protected listeners: Listener<T>[];

    constructor() {
        this.listeners = [];
    }

    public addListener(listenerFunc: Listener<T>) {
        this.listeners.push(listenerFunc);
    }

    abstract updateListeners(): void;

}

// Project State class

class ProjectState extends State<Project>{
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

// Project Component Base

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach();
    }

    abstract attach(): void;
    abstract configure(): void;
    abstract renderContent(): void;
}

// ProjectList class

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

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

// ProjectItem class

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {

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

// ProjectInput

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', CssIds.USER_INPUT);
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {

    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        try {
            const [title, desc, people] = this.gatherUserInput();
            ProjectState
                .getInstance()
                .addProject(title, desc, people);
        } catch (e: any) {
            console.log(`Exception: ${e}`);
            alert('Bad inputs');
            this.clearInputs();
        }
    }

    private gatherUserInput(): [string, string, number] {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        if (
            !validate({
                value: enteredTitle,
                required: true,
            }) ||
            !validate({
                value: enteredDescription,
                required: true,
                minLength: 5,
                maxLength: 255
            }) ||
            !validate({
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 3
            })
        ) {
            throw new Error(`Bad input values`);
        }

        return [enteredTitle, enteredDescription, +enteredPeople];
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

}

enum CssIds {
    USER_INPUT = 'user-input'
}

const pro = new ProjectInput();
const activeProjectList = new ProjectList(ProjectStatus.Active);
const finishedProjectList = new ProjectList(ProjectStatus.Finished);

