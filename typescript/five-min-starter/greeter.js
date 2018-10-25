// ____________________________________Type Annotations
// const greeter = (person: string) => `Hello ${person}`;
var greeter = function (person) { return "Hello " + person.firstName + " " + person.lastName; };
var user = {
    firstName: 'Max',
    lastName: 'Hilliard'
};
document.body.innerHTML = greeter(user);
