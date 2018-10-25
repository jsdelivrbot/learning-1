// ____________________________________Type Annotations
// const greeter = (person: string) => `Hello ${person}`;

// const user = "Jane"

// ____________________________________Interfaces
// Defines a structure for an object passed as a param, kinda like PropTypes.shape

// interface Person {
//     firstName: string,
//     lastName: string,
// }

// const greeter = ({firstName, lastName}: Person) => `Hello ${firstName} ${lastName}`

// const user = {
//     firstName: 'Max',
//     lastName: 'Hilliard',
// }

// __________________________________Classes
// Demonstration of how classes and interfaces work together

class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = `${firstName} ${middleInitial} ${lastName}`;
    }
};

const user = new Student('George', 'W. G.', 'Hilliard');

const greeter = (student: Student) => `Hello ${student}`;

document.body.innerHTML = greeter(user);
