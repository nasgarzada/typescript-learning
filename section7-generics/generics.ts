const names: Array<string> = [];

const result = names.push('hello', 'it\'s', 'me');

console.log(result);


const promise = new Promise<string>((resolve, reject) => {
    setTimeout(() => {
        reject('This is done');
    }, 1000);
})

promise.then((value: string) => {
    console.log(value);
}, (reason: any) => {
    console.log(`Failed: ${reason}`);
});


// Generic function:
// This return T & U 
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObject = merge({ name: 'Nicat' }, { age: 23 });

console.log(mergedObject);


// declare interface that has length parameter
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = 'Got no value.';
    if (element.length === 1) {
        description = `Got 1 element.`;
    } else if (element.length > 1) {
        description = `Got ${element.length} elements.`;
    }
    return [element, description];
}

const method = countAndDescribe(['hello it\'s me']);
console.log(method);

// Key of - use this for showing that some type is key of that
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ lastName: 'Asgerzade' }, 'lastName'));


// generic classes

class DataStorage<T>{
    private readonly data: Array<T>;

    private constructor() {
        this.data = [];
    }

    public static create<T>() {
        return new DataStorage<T>();
    }

    public addItem(item: T) {
        this.data.push(item);
    }

    public getItems(): Array<T> {
        return [...this.data];
    }

    public removeItem(item: T) {
        let itemIndex = this.data.indexOf(item);
        if (itemIndex === -1) {
            return;
        }
        this.data.splice(itemIndex, 1);
    }

}

const textStorage = DataStorage.create<string>();

textStorage.addItem('Hello');
textStorage.addItem('World!.');
textStorage.addItem('My');
textStorage.addItem('name');
textStorage.addItem('is ');
textStorage.addItem('Someone');

textStorage.removeItem('name');

console.log(textStorage.getItems());


//Partial type

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // in this case we can't add fields step by step.
    // let goal: CourseGoal = {};  
    let goal: Partial<CourseGoal> = {};
    goal.title = title;
    goal.description = description;
    goal.completeUntil = date;
    return <CourseGoal>goal;
}


// Readonly values:

const childNames: Readonly<string[]> = ['Max','Anna'];
// we can't pop. Because var is readonly
// childNames.pop();
// childNames.push('s');
