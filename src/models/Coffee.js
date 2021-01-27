const mongoose = require("mongoose");

const coffeeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    extras: {
        type: String,
        required: true,
    },
})

const Coffee = mongoose.model("Coffee", coffeeSchema)

module.exports = {
    Coffee
}