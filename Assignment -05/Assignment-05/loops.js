// Q1: Print numbers 1 to 10
// Write a program using a for loop to print numbers from 1 to 10.
console.log("--- Q1: Print numbers 1 to 10 ---");
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

// Q2: Sum of first N numbers
// Use a while loop to calculate the sum of the first N natural numbers.
console.log("\n--- Q2: Sum of first N numbers ---");
let N = 5; // You can change this value to test different numbers
let sum = 0;
let i = 1;
while (i <= N) {
  sum += i;
  i++;
}
console.log(`Sum of first ${N} numbers is: ${sum}`);

// Q3: Multiplication table
// Print the multiplication table of a given number using a for loop.
console.log("\n--- Q3: Multiplication table ---");
let tableNum = 7; // The number for the table
for (let i = 1; i <= 10; i++) {
  console.log(`${tableNum} x ${i} = ${tableNum * i}`);
}

// Q4: Factorial calculation
// Write a program using a while loop to find the factorial of a given number.
console.log("\n--- Q4: Factorial calculation ---");
let factNum = 5; // The number to find the factorial for
let factorial = 1;
let count = factNum;
while (count > 0) {
  factorial *= count;
  count--;
}
console.log(`Factorial of ${factNum} is: ${factorial}`);

// Q5: Reverse counting
// Print numbers from 10 down to 1 using a for loop.
console.log("\n--- Q5: Reverse counting ---");
for (let i = 10; i >= 1; i--) {
  console.log(i);
}

// Q6: Even numbers up to N
// Use a do-while loop to print all even numbers up to N.
console.log("\n--- Q6: Even numbers up to N ---");
let evenLimit = 12; // Print even numbers up to this number
let currentNum = 1;
do {
  if (currentNum % 2 === 0) {
    console.log(currentNum);
  }
  currentNum++;
} while (currentNum <= evenLimit);

// Q7: Sum of digits
// Write a program using a while loop to calculate the sum of digits of a given number.
console.log("\n--- Q7: Sum of digits ---");
let originalNum = 12345;
let tempNum = originalNum;
let digitSum = 0;
while (tempNum > 0) {
  digitSum += tempNum % 10; // Extract the last digit
  tempNum = Math.floor(tempNum / 10); // Remove the last digit
}
console.log(`Sum of digits for ${originalNum} is: ${digitSum}`);

// Q8: Fibonacci series
// Generate the first 10 terms of the Fibonacci series using a for loop.
console.log("\n--- Q8: Fibonacci series ---");
let t1 = 0,
  t2 = 1;
console.log(`Term 1: ${t1}`);
console.log(`Term 2: ${t2}`);
for (let i = 3; i <= 10; i++) {
  let nextTerm = t1 + t2;
  console.log(`Term ${i}: ${nextTerm}`);
  t1 = t2;
  t2 = nextTerm;
}

// Q9: Guessing game
// Use a do-while loop to keep asking the user for a number until they guess the correct one.
console.log("\n--- Q9: Guessing game ---");
const correctNumber = 7;
let userGuess;
// Note: Simulating user interaction for console output compatibility.
// In a browser, you would use `parseInt(prompt("Guess a number between 1 and 10:"))`
let mockGuesses = [3, 5, 7];
let guessIndex = 0;

do {
  userGuess = mockGuesses[guessIndex];
  console.log(`User guesses: ${userGuess}`);
  if (userGuess === correctNumber) {
    console.log("Correct! You guessed it.");
  } else {
    console.log("Wrong guess, try again!");
  }
  guessIndex++;
} while (userGuess !== correctNumber && guessIndex < mockGuesses.length);

// Q10: Prime number check
// Write a program using a for loop to check if a given number is prime.
console.log("\n--- Q10: Prime number check ---");
let checkPrime = 29; // Number to check
let isPrime = true;

if (checkPrime <= 1) {
  isPrime = false;
} else {
  for (let i = 2; i <= Math.sqrt(checkPrime); i++) {
    if (checkPrime % i === 0) {
      isPrime = false;
      break;
    }
  }
}
console.log(`Is ${checkPrime} a prime number? ${isPrime}`);
