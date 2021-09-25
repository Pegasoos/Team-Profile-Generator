const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
    
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
        name:"officeNumber"
    },
]).then((answers) =>{
    //create new manager with inquirer input as params
    let customManager = new Manager(answers.name,answers.id,answers.email,answers.officeNumber);
    //add new manager to employees array to feed to render later
    employees.push(customManager);
    nextEmployee()
    })

const nextEmployee = function(){
    inquirer.prompt([
        {
            type:"confirm",
            message:"Would you like to add another employee?",
            name:"nextEmployee"
        }
    ]).then((answers) => {
        if(answers.nextEmployee){
            inquirer.prompt([{
                type:"list",
            message:"Are they an Intern or an Engineer?",
            name:"occupation",
            choices:["Intern", "Engineer"]
            }]).then((answer =>{addEmployees(answer)}))
        }
        else{console.log(render(employees))}
    }).catch((error) => console.log(error))
}

const addEmployees = function(answer){
    if(answer.occupation === "Intern"){
        inquirer.prompt([
                {
                    type: "input",
                    message: "Who is this intern?",
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
                    message:"What school do they go to?",
                    name:"school"
                },
        ]).then((answers) =>{
            let customIntern = new Intern(answers.name,answers.id,answers.email,answers.school)
            employees.push(customIntern)
            console.log(employees)
            nextEmployee();
        }).catch((error) => console.log(error))
    }
    else{
        inquirer.prompt([
            {
                type: "input",
                message: "Who is this engineer?",
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
                message:"What is their Github?",
                name:"github"
            },
        ]).then((answers) => {
            let customEngineer = new Engineer(answers.name,answers.id,answers.email,answers.github)
            employees.push(customEngineer)
            console.log(employees)
            nextEmployee();
        }).catch((error) => console.log(error))
    }
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.