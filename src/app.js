const figlet = require("figlet");
const inquirer = require("inquirer");
const chalk = require("chalk")
const { addNote, removeNote, listNotes, clearAll } = require("../utils/notes")

const topLevelQuestion = [
    {type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["add", "list", "remove", "exit"]}
]

const addQuestion = [
    {type: 'input', name: 'add', message: "What type of coffee would you lke to add"}
]

const sizeQuestion = [
    {type: "list",
    name: "options",
    message: "What size would you like?",
    choices: ["Extra Large", "Large", "Regular", "Small"]}
]

const extrasQuestion = [
    {type: 'input', name: 'extras', message: "Any Extras? e.g Milk or Sugar"}
]

const removeQuestion = [
    {type: "list",
    name: "options",
    message: "Would you like to clear the list?",
    choices: ["Yes", "No"]}
]

const removeOneQuestion = [
    {type: 'number', name: 'remove', message: "Which coffee would you lke to remove"}
]

const main = () => {
    console.log(chalk.bgYellow.black(figlet.textSync("THE COFFEE COUNT")))
    app() 
};

const app = async () => {
    const answers = await inquirer.prompt(topLevelQuestion)
    if (answers.options == "add"){
        const addAnswer = await inquirer.prompt(addQuestion)
        const sizeAnswer = await inquirer.prompt(sizeQuestion)
        const extrasAnswer = await inquirer.prompt(extrasQuestion)
        addNote(addAnswer.add, sizeAnswer.options, extrasAnswer.extras)
        console.log(` Added a ${addAnswer.add}, size ${sizeAnswer.options}, with ${extrasAnswer.extras}`)
        app()
    }else if (answers.options == "list"){
        listNotes()
        app()
    }else if (answers.options == "remove"){
        listNotes()
        const answer = await inquirer.prompt(removeQuestion)
        if (answer.options == "Yes"){
            clearAll()
        }else if (answer.options == "No"){
            const removeAnswer = await inquirer.prompt(removeOneQuestion)
            removeNote(removeAnswer)
        }
        app()
    }else if (answers.options == "exit"){
        console.log("Bye for now")
        
    }else{
        console.log("error")
    }
}

main();