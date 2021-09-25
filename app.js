const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
    //array to store all generated employee objects for later
const employees = [];

    //initial prompt for manager information, always fires first
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
//function to see if add more employees or render page if the user is done
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
        //cut off point for inquirer, renders page in output directory
        else{
            let htmlContent = render(employees)
            fs.writeFile(outputPath, htmlContent, (err) =>{
                if(err){
                    throw err;
                }
            })
        }
    }).catch((error) => console.log(error))
}
// function fires if user chiises to add another employee, handles employee class and changes questions accordingly
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