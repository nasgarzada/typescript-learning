const PHRASE = 'Result is: ';

let number : number;

function addNums(n1: number, n2: number, showResult: boolean) {
    const sum = n1 + n2;
    if (showResult) {
        console.log(`${PHRASE} ${sum}`);
    }
    return sum;
}

