const show = (data: any): void => console.log(data);

// union types used in combine function parameter and as a return type we used void.
// if we use undefined, then we must use return;
const combine = (input1: string | number | string[]): undefined => {
    show(input1);
    return;
}

// we created add() function and declared return type as a number
const add = (n1: number, n2: number): number => { return n1 + n2 };

// enum type as Status
enum Status {
    ACTIVE,
    BLOCKED,
    DELETED
};

enum Roles {
    USER_VIEW,
    USER_CREATE
}

//we created union type alias
type Combinable = number | string;

// we created Role type alias. We can use tuple instead of this
type Role = {
    roleId: number;
    roleName: string;
}

// we created tuple [number, string] for RoleType type alias
type RoleType = [number, Roles];

// we created Person type alias
type Persons = {
    name: string;
    age: number;
    hobbies: string[];
    roles: RoleType[];
    status: Status;
}

// we used Person type for creating object
const person: Persons = {
    name: 'Nicat',
    age: 23,
    hobbies: ['Swimming', 'Singing'],
    roles: [
        [1, Roles.USER_CREATE],
        [2, Roles.USER_VIEW]
    ],
    status: Status.ACTIVE
}

show(person);

for (const hobby of person.hobbies) {
    show(hobby.toUpperCase());
}

combine(['Hello', 'World']);

// we created new variable copyAdd which has type Function
// we can't assign other type 
let copyAdd: Function;
copyAdd = add;

//function must has return type as number, but any parameter
let strictFunc: (...a: any)=> number;
strictFunc = add;



