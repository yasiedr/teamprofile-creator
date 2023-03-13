const inquirer = require('inquirer');

const fs = require('fs');

const Employee = require('./lib/employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');


var employees = [];

function promptEmployeeInfo() {
  return inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      name: "name",
      message: "What is the employee's name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("You need to enter a name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is the employee's ID?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the employee's email?",
      validate: (email) => {
        if (email) {
          return true;
        } else {
          console.log("You need to enter an email!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is the manager's office number?",
      when: (answers) => answers.role === "Manager",
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's GitHub username?",
      when: (answers) => answers.role === "Engineer",
    },
    {
      type: "input",
      name: "schoolname",
      message: "What is the intern's school name?",
      when: (answers) => answers.role === "Intern",
    },
    
  ]);
}

const menu = function () {
    //select engineer, intern, or finish team
    return inquirer
      .prompt([
        {
          type: "list",
          message: "What employee would you like to add?",
          name: "role",
          choices: ["Engineer", "Intern"],
        },
        {
          type: "text",
          name: "name",
          message: "What is the name of the employee?",
        },
        {
          type: "text",
          name: "id",
          message: "What is the employee ID?",
          validate: (idInput) => {
            if (idInput) {
              return true;
            } else {
              console.log("You need to enter an ID!");
              return false;
            }
          },
        },
{
    type: "confirm",
    name: "confirmAddEmployee",
    message: "Would you like to add another employee?",
    default: false,
  }
])
.then((employeesData) => {
  let { name, id, email, role, github, school, confirmAddEmployee } =
    employeesData;
  let employee;

  if (role === "Engineer") {
    employee = new Engineer(name, id, email, github);
    console.log(employee);
  } else if (role === "Intern") {
    employee = new Intern(name, id, email, school);
    console.log(employee);
  }
  employees.push(employee);

  if (confirmAddEmployee) {
    return menu(employees);
  } else {
    // console.log(employees);
    return employees;
  }
});
}