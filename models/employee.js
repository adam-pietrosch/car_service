const mongo = require('mongoose')

const schema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    personal_number: {
        type: Number,
        required: true
    }
})

module.exports = mongo.model('Employee', schema)