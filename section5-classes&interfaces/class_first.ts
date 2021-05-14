abstract class Department {
    // Added fields and constructor.Commented version is shortcut for this
    private name: string;
    private readonly employees: Employee[] = [];

    constructor(name: string) {
        this.name = name;
    }

    // this constructor receives 2 fields. One of them is initialized
    // constructor(private name: string, private employees: Employee[] = []) { }

    // setter. when use this set keyword, we can use like prop, instead of calling method
    public set setName(name: string) {
        this.name = name;
    }

    public get getName(): string {
        return this.name;
    }

    public set setEmployee(employee: string) {
        this.addEmployee(employee);
    }

    // ts getter
    public get getEmployees(): Employee[] {
        return this.employees;
    }

    // add this keyword as a parameter for type safety
    public abstract describe(this: Department): void;

    protected abstract addEmployee(fullName: string): void;

    // add helper method 
    protected print(...data: any) {
        console.log(data);
    }
}

class ItDepartment extends Department {
    private readonly admins: string[];
    private static readonly INSTANCE: ItDepartment;

    private constructor(name: string) {
        super(name);
        this.admins = [];
    }

    public static of(name: string): ItDepartment {
        if (this.INSTANCE) {
            return this.INSTANCE;
        }
        return new ItDepartment(name);
    }

    public set setAdmin(admin: string) {
        this.admins.push(admin);
    }

    public get getAdmins(): string[] {
        return this.admins;
    }

    protected addEmployee(fullName: string) {
        let splitted = fullName.split(' ');

        super.print(splitted.length);

        if (splitted.length !== 2)
            return;

        super.getEmployees
            .push(
                {
                    name: splitted[0],
                    lastname: splitted[1]
                }
            );
    }

    public describe() {
        super.print(`This is IT department - ${this.admins}`);
    }

}

type Employee = {
    name: string;
    lastname: string;
}



let csDepartment = ItDepartment.of('Computer Science');

csDepartment.setEmployee = 'Nicat Asgarzada';
csDepartment.setAdmin = 'Admin Admin';
csDepartment.describe();
console.log(csDepartment.getEmployees);
console.log(csDepartment);

//let's create copy of class
// if we don't add name prop then we'll get error.
// because we ensure type safety
// let copyOfDepartment = { name: csDepartment.name, describe: csDepartment.describe };

// added second variation for copying props, but don't work for functions
// let copyOfDepartment = { ...csDepartment, describe: csDepartment.describe };

// copyOfDepartment.describe();