
const express = require("express")
const NotesModel = require('../model/notes.model')
const notesRouter = express.Router()

notesRouter.get('/mynotes', async (req, res) => {
    const { email } = req.body;

    try {
        let notes = await NotesModel.find({ email: email })
        if (notes.length > 0) {
            return res.send(notes)
        } else {
            return res.send({ "msg": "No Notes has been created!" })
        }
    } catch (error) {
        return res.status(404).send({ "msg": "failed to fetch!" })
    }
})

notesRouter.post('/mynotes', async (req, res) => {
    const { email, title, note } = req.body;

    try {
        let newNote = new NotesModel({ email, title, note })
        await newNote.save()
        return res.send({ "msg": "Note has been created!" })
    } catch (error) {
        return res.status(404).send({ "msg": "failed to create new note!" })
    }
})

notesRouter.delete('/mynotes/:id', async (req, res) => {

    let _id = req.params.id

    try {
        await NotesModel.findByIdAndDelete(_id)
        return res.send({ "msg": "Note has been deleted!" })
    } catch (error) {
        return res.status(404).send({ "msg": "failed to delete note!" })
    }
})



module.exports = notesRouter