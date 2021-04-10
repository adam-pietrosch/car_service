const mongo = require('mongoose')

const schema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

})

module.exports = mongo.model('Owner', schema)