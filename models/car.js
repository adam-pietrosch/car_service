const mongo = require('mongoose')

const schema = new mongo.Schema({
    registration_mark: {
        type: String,
        required: true
    },
    manufacter: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    manufacture_year: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    engine_capacity: {
        type: String,
        required: true
    },
    transmission_type: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    }
})

module.exports = mongo.model('Car', schema)