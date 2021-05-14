function Logger(message?: string) {
    return (constructor: Function) => {
        console.log(`[${new Date().toISOString()}] - ${constructor.name}: - Logger started!`);
    };
}


@Logger()
class HelloPerson {
    name: string;

    constructor() {
        this.name = 'Max';
        console.log('Creating person...');
    }
}

const p1 = new HelloPerson();

interface ValidatorConfig {
    [prop: string]: {
        [validatableProps: string]: string[]
    }
}

const registeredValidators: ValidatorConfig = {};


function NotNull(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
    };
}


class Course {
    @NotNull
    title: string;
    price: number;
    constructor(title: string, price: number) {
        this.price = price;
        this.title = title;
    }
}

function validated(obj: any): boolean {
    let isValid = false;
    const validationProps = registeredValidators[obj.constructor.name];
    if (!validationProps) {
        isValid = true;
    }

    for (const prop in validationProps) {
        validationProps[prop].forEach((validator: string) => {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
            }
        });
    }

    return isValid;
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    validated(createdCourse);
    console.log(createdCourse);
});
