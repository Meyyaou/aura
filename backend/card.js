//model of card from bd
const mongoose= require("mongoose");

const cardSchema= mongoose.Schema({
    content: {type: String, required: true},
    choice1: {type: String, required: true},
    point1: {type: Number, required: true},
    choice2: {type: String, required: true},
    point2: {type: Number, required: true},
});

module.exports = mongoose.model("Card", cardSchema);
