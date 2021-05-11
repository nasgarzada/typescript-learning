type Admin = {
    name: string;
    privileges: string[];
};

type Employe = {
    name: string;
    startDate: Date;
};

// this is intersection type
// it's simply interface that extends from Admin and Employee
type ElevatedEmployee = Admin & Employe;

const e1: ElevatedEmployee = {
    name: 'Nicat',
    privileges: ['CREATE_SERVER'],
    startDate: new Date()
}

type UnknownEmloyee = Employe | Admin;

// in here we used type guard
function printEmployeeInfo(emp: UnknownEmloyee) {
    console.log(`Name: ${emp.name}`);
    // we can't use typeof === 'Admin'. Because js has not type like that
    // workaround this is use like following
    if ('privileges' in emp) {
        console.log(`Privileges:  ${emp.privileges}`);
    }

    //we can improve type guarding, but it's to be class
    // if (emp instanceof Admin){
    //     console.log(`Privileges:  ${emp.privileges}`);
    // }
}

// we used interface type, because we have to ensure type guarding.
enum InterfaceType {
    Bird,
    Horse
}

interface Bird {
    type: InterfaceType.Bird;
    flyingSpeed: number;
}

interface Horse {
    type: InterfaceType.Horse;
    runningSpeed: number;
}

type Animal = Bird | Horse;

// we used type for selecting speed
function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case InterfaceType.Bird:
            speed = animal.flyingSpeed;
            break;
        case InterfaceType.Horse:
            speed = animal.runningSpeed;
            break;
    }
    console.log(`Speed of animal is ${speed}`);
}

moveAnimal({ type: InterfaceType.Horse, runningSpeed: 12 });

//we declare type casting
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// this is another way of type casting
// if we ensure that value not be null,then we add ! to the method
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

// if we don't sure that value not null, then we have to check it
const userInputElement = document.getElementById('user-input');

// we check value is not null 
if (userInputElement) {
    // then we casting with following 2 ways
    // (<HTMLInputElement>userInputElement).value = 'Hello';
    (userInputElement as HTMLInputElement).value = 'Hello';
}


//we declared index properties. Because we don't know which property name has to be added.
interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    user: 'Nicat',
    email: 'n@gmail.com'
};

// Optional chaining - we fetching some data from db for example.
// But we don't know whether prop has or not. Therefore, we add ? mark to props

const fetchedData = {
    id: 1,
    user: 'nicat',
    job: {
        title: 'Back-end developer',
        description: 'Software development'
    }
};

// we used optional chaining
console.log(fetchedData?.job?.title);

// Nullish coalescing - We don't some value return. That's why, we use this.
const inp = undefined;
const storedData = inp ?? 'Hello';