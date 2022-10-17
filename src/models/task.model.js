const mongoose = require('mongoose');
const Task = mongoose.model("Task", {
    name: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    estimated: {
        type: Number,
        required: true,
        default:0
    },
    done: {
        type: Number,
        default:0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = Task;