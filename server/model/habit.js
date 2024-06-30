const mongoose = require('mongoose');

const {Schema} = mongoose;

const HabitSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false }
})

const HabitModel =  mongoose.model('Habit' , HabitSchema)

module.exports = HabitModel