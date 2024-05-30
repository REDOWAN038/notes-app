const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        trim: true
    },
    content: {
        type: String,
        required: [true, "content is required"],
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model("Note", noteSchema)