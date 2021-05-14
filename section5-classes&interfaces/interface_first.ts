interface Named {
    readonly name: string;
    // we declared optional parameter 
    //that it's not important to add to subclasses
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;
    age: number;

    constructor(name: string) {
        this.name = name;
        this.age = 23;
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`);
    }
}

let user1: Person = new Person('Nicat Asgerzade');

console.log(user1);


// ------------------------------------------------------
// we defined custom type and give function to it
// type AddFn = (a: number, b: number) => number;
let addNumber: AddFn;
// this is AddFn implementation
addNumber = (n1: number, n2: number) => {
    return n1 + n2;
};
console.log(addNumber(1, 2));

//we can define AddFn as an interface for simplicity
interface AddFn {
    // this is anonymus function
    (a: number, b: number): number;
}
