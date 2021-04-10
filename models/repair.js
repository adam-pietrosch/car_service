const mongo = require('mongoose')

const schema = new mongo.Schema({
    date: {
        type: String,
        required: true
    },
    employees: {
        type: String,
        required: true
    },
    problem_description: {
        type: String,
        required: true
    },
    replaced_parts: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    costs: {
        type: Number,
        required: true
    }
})

module.exports = mongo.model('Repair', schema)