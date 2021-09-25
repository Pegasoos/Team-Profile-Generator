const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
inquirer.prompt([
    {
        type: "input",
        message: "Who is the manager?",
        name: "name" 
    },
    {
        type:"input",
        message: "What is their id number?",
        name: "id"
    },
    {
        type:"input",
        message:"What is their email?",
        name:"email"
    },
    {
        type:"input",
        message:"What is their office number?",
        name:"office number"
    }
]).then((answers) =>{
    console.log(answers)
}).catch((error)=>{
    console.log(error)
})
//Inquirer Question Flow: Create Array of Employees From User Responses
//Who is the Manager? What is their name? What us their id? What is their email? What is their office number?
//Would you like to add another employee? Confirm Y/N
//What is their role? Multiple Choice with Engineer or Intern
//Intern: What is their name? What us their id? What is their email? What is their school?
//Engineer: What is their name? What us their id? What is their email? What is their github?
// call render function from above with array of employees

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.