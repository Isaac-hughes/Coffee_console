require('./db/connection');
const figlet = require("figlet");
const inquirer = require("inquirer");
const chalk = require("chalk")
const { Coffee } = require("./models/Coffee")

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

const listItems = async () => {
    try{
        const everything = await Coffee.find({});
        for (i in everything){
            let t = everything[i].type
            let s = everything[i].size
            let e = everything[i].extras
            let num = (parseInt(i)) + 1
            console.log(`
            ${num}. Order: ${t}, Size: ${s}, Extras: ${e}`)
        }
    } catch (error){
        console.log("Error trying to return the list")
    }
}

const app = async () => {
    const answers = await inquirer.prompt(topLevelQuestion)
    if (answers.options == "add"){
        const addAnswer = await inquirer.prompt(addQuestion)
        const sizeAnswer = await inquirer.prompt(sizeQuestion)
        const extrasAnswer = await inquirer.prompt(extrasQuestion)
        try {
            const coffee = new Coffee({ type: addAnswer.add, size: sizeAnswer.options, extras: extrasAnswer.extras})
            await coffee.save()
        } catch (error){
            console.log("An issue occurred while trying to add a new coffee to the database")
        }
        console.log(` Added a ${addAnswer.add}, size ${sizeAnswer.options}, with ${extrasAnswer.extras}`)
        app()
    }else if (answers.options == "list"){
        listItems()
        app()
    }else if (answers.options == "remove"){
        try{
            const answer = await inquirer.prompt(removeQuestion)
            listItems()
            if (answer.options == "Yes"){
                await Coffee.deleteMany();
                console.log("The list has been cleared")
            }else if (answer.options == "No"){
                const removeAnswer = await inquirer.prompt(removeOneQuestion)
                const object = await Coffee.find({});
                let num = removeAnswer.remove - 1
                console.log(object, num)
                
                // let deleted = await Coffee.deleteOne([num])
                // console.log(deleted)
            }
        } catch (error){
            console.log("Error trying to remove item(s)")
        }
        app()
    }else if (answers.options == "exit"){
        console.log("Bye for now")
        
    }else{
        console.log("error")
    }
}

main();