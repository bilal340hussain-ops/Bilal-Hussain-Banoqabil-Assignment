// Q1: Write a program that checks if a number is positive, negative, or zero.
let number = 10;
if (number > 0) {
  console.log(number + " is positive.");
} else if (number < 0) {
  console.log(number + " is negative.");
} else {
  console.log("The number is zero.");
}

// Q2: Using an if-else statement, determine whether a given integer is even or odd.
let intNum = 7;
if (intNum % 2 === 0) {
  console.log(intNum + " is even.");
} else {
  console.log(intNum + " is odd.");
}

// Q3: Write a program that takes two numbers and prints the larger one using conditional statements.
let num1 = 15;
let num2 = 25;
if (num1 > num2) {
  console.log(num1 + " is the larger number.");
} else if (num2 > num1) {
  console.log(num2 + " is the larger number.");
} else {
  console.log("Both numbers are equal.");
}

// Q4: Using if-else-if, assign grades (A, B, C, D, F) based on a student’s percentage score.
let score = 85;
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// Q5: Write a program that checks if a given year is a leap year using conditional statements.
let year = 2024;
if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
  console.log(year + " is a leap year.");
} else {
  console.log(year + " is not a leap year.");
}

// Q6: Use a switch-case to print the name of the day when given a number (1 = Monday, 2 = Tuesday, … 7 = Sunday).
let dayNum = 3;
switch (dayNum) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day number. Please enter a number between 1 and 7.");
}

// Q7: Create a simple calculator using switch-case that performs addition, subtraction, multiplication, or division based on user input.
let a = 12;
let b = 4;
let operation = "+";
switch (operation) {
  case "+":
    console.log("Result: " + (a + b));
    break;
  case "-":
    console.log("Result: " + (a - b));
    break;
  case "*":
    console.log("Result: " + a * b);
    break;
  case "/":
    if (b !== 0) {
      console.log("Result: " + a / b);
    } else {
      console.log("Error: Division by zero is not allowed.");
    }
    break;
  default:
    console.log("Invalid operator. Use +, -, *, or /.");
}

// Q8: Write a program that checks whether a given character is a vowel or consonant using switch-case.
let char = "e";
let lowerChar = char.toLowerCase();
switch (lowerChar) {
  case "a":
  case "e":
  case "i":
  case "o":
  case "u":
    console.log(char + " is a vowel.");
    break;
  default:
    // Checking if it's a valid letter
    if (lowerChar >= "a" && lowerChar <= "z") {
      console.log(char + " is a consonant.");
    } else {
      console.log("Invalid character input.");
    }
}

// Q9: Using switch-case, print instructions based on traffic light color (Red = Stop, Yellow = Wait, Green = Go).
let lightColor = "Yellow";
switch (lightColor.toLowerCase()) {
  case "red":
    console.log("Stop");
    break;
  case "yellow":
    console.log("Wait");
    break;
  case "green":
    console.log("Go");
    break;
  default:
    console.log("Invalid traffic light color.");
}

// Q10: Write a program using switch-case where the user selects from a menu (e.g., 1 = Check Balance, 2 = Deposit, 3 = Withdraw, 4 = Exit).
let menuChoice = 2;
switch (menuChoice) {
  case 1:
    console.log("Displaying your current balance...");
    break;
  case 2:
    console.log("Please enter the amount you want to deposit...");
    break;
  case 3:
    console.log("Please enter the amount you want to withdraw...");
    break;
  case 4:
    console.log("Exiting the system. Thank you!");
    break;
  default:
    console.log("Invalid choice. Please select an option from 1 to 4.");
}
