const arr: string[] = ['Jello', 'World', 'It', 'me'];

type User = {
    firstName: string;
    lastName: string;
    email: string;
}

const user: User = {
    "firstName": "Nicat",
    "lastName": "Asgerzade",
    "email": "nicat@gmail.com"
}

console.log(...arr);

//in here we declare array destruction
const [hello, world] = arr;
console.log(hello);
console.log(world);

// in here we declare object destruction
// in first argument we used myName variable instead of firstName
// because firstName is key of object and must declare for getting value
const {firstName: myName, lastName} = user;
console.log(myName, lastName)

