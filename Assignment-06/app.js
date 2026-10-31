
"use strict";

// Q1: Create a function that takes an array of numbers
// and returns a new array where each number is squared using map.

const numbers = [1, 2, 3, 4, 5];

function squareNumbers(arr) {
    return arr.map(n => n ** 2);
}

console.log("Q1:", squareNumbers(numbers));


// Q2: Filter users whose age is greater than 18.

const users = [
    { name: "Ali", age: 17 },
    { name: "Ahmed", age: 22 },
    { name: "Sara", age: 19 },
    { name: "Usman", age: 16 }
];

function filterAdults(arr) {
    return arr.filter(user => user.age > 18);
}

console.log("Q2:", filterAdults(users));


// Q3: Use reduce to calculate the total price of products.

const products = [
    { name: "Laptop", price: 50000 },
    { name: "Mouse", price: 1500 },
    { name: "Keyboard", price: 3000 }
];

const totalPrice = products.reduce(
    (total, product) => total + product.price,
    0
);

console.log("Q3: Total price =", totalPrice);


// Q4: Sort students in descending order based on marks.

const students = [
    { name: "Ali", marks: 75 },
    { name: "Sara", marks: 92 },
    { name: "Ahmed", marks: 68 },
    { name: "Usman", marks: 85 }
];

const sortedStudents = [...students].sort(
    (a, b) => b.marks - a.marks
);

console.log("Q4:", sortedStudents);


// Q5: Find the first string with length greater than 5.

const words = ["Cat", "Apple", "Banana", "Orange", "Dog"];

function findLongString(arr) {
    return arr.find(word => word.length > 5);
}

console.log("Q5:", findLongString(words));


// Q6: Create a person object with fullName method using this.

const person = {
    firstName: "Bilal",
    lastName: "Ahmed",

    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
};

console.log("Q6:", person.fullName());

// Explanation:
// "this" refers to the object before the dot when the method is called.
// Here, person.fullName() makes "this" refer to person.


// Q7: Show the difference between regular and arrow functions
// when using this inside an object.

const example = {
    name: "JavaScript",

    regularFunction: function () {
        return this.name;
    },

    arrowFunction: () => {
        return this.name;
    }
};

console.log("Q7: Regular function =", example.regularFunction());
console.log("Q7: Arrow function =", example.arrowFunction());

// Explanation:
// A regular function gets "this" from how it is called.
// An arrow function inherits "this" from its surrounding scope.
// In a normal browser script, the arrow function above usually
// returns an empty value (undefined), not "JavaScript".


// Q8: Filter even numbers, double them using map,
// then calculate their sum using reduce in a chain.

const values = [1, 2, 3, 4, 5, 6];

function sumDoubledEvens(arr) {
    return arr
        .filter(n => n % 2 === 0)
        .map(n => n * 2)
        .reduce((sum, n) => sum + n, 0);
}

console.log("Q8:", sumDoubledEvens(values));


// Q9: Find an HR employee and sort employees by salary
// in ascending order.

const employees = [
    { name: "Ali", department: "IT", salary: 60000 },
    { name: "Sara", department: "HR", salary: 45000 },
    { name: "Ahmed", department: "Sales", salary: 35000 },
    { name: "Usman", department: "HR", salary: 50000 }
];

// Q9(a): Find an employee who works in HR.

const hrEmployee = employees.find(
    employee => employee.department === "HR"
);

console.log("Q9(a): HR employee =", hrEmployee);

// Q9(b): Sort employees by salary in ascending order.

const employeesBySalary = [...employees].sort(
    (a, b) => a.salary - b.salary
);

console.log("Q9(b): Sorted by salary =", employeesBySalary);


// Q10: Get object keys and values separately,
// then create a new object using Object.fromEntries.

const student = {
    name: "Bilal",
    age: 16,
    course: "JavaScript"
};

const keys = Object.keys(student);
const valuesArray = Object.values(student);

console.log("Q10: Keys =", keys);
console.log("Q10: Values =", valuesArray);

// Create a new object from an array of key-value pairs.

const entries = [
    ["name", "Ahmed"],
    ["age", 20],
    ["course", "Web Development"]
];

const newObject = Object.fromEntries(entries);

console.log("Q10: New object =", newObject);
