const mongoose = require("mongoose")

const noteschema = mongoose.Schema({
    email: String,
    title: String,
    note: String,
    priority: String
})

const NotesModel = mongoose.model("note", noteschema)
module.exports = NotesModel