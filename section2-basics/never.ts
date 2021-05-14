// we assigned variable as an unknown type.
// It's differentiate from any type.
let userInput: unknown;
userInput = 'addd';
userInput = 12;

let userInfo: string;
// we can't assign unknown type to string type. 
// Because we don't know type, but we can assign to any. That's the difference
// userInfo = userInput;


type CustomException = {
    message: string;
    code: number;
}

// in here we used never type, because never function returns
const generateError = (message: string, code: number): never => {
    let exception: CustomException = {
        "message": message,
        "code": code
    };
    throw exception;
}
