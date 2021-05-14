import { Component } from './Component.js';
import { CssIds } from '../models/enums/CssIds.js';
import { Autobind } from '../decorators/Autobind.js';
import { ProjectState } from './ProjectState.js';
import { validate } from '../util/ValidationHelper.js';

// ProjectInput

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

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
