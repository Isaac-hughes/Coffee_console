const fs = require("fs");

const addNote = (type, size, extras) => {
    const allNotes = loadNotes();
    allNotes.push({ type: type, size: size, extras: extras });
    saveNotes(allNotes);
}

const loadNotes = ()  => {
    try{
        const dataBuffer = fs.readFileSync("src/notes.json");
        const notesJson = dataBuffer.toString();
        return JSON.parse(notesJson)
    } catch (error) {
        return [];
    }
}

const listNotes = () => {
    const allNotes = loadNotes();

    allNotes.map((order, index) => {
        console.log(`
        ${index+1}. ${order.type}, size: ${order.size}, extras: ${order.extras}`);
    });
};

const saveNotes = allNotes => {
    const notesJson = JSON.stringify(allNotes);
    fs.writeFileSync("src/notes.json", notesJson) 
}

const removeNote = noteToDelete => {
    const allNotes = loadNotes()

    try {
        const removedItem = allNotes.splice(noteToDelete - 1, 1)
        console.log(`Successfully removed ${removedItem[0].reminder}`);
    } catch (error){
        console.log("Number out of range");
    }
    saveNotes(allNotes);
}

module.exports = {
    loadNotes,
    addNote,
    listNotes,
    removeNote
}