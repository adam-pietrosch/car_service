const mongo = require('mongoose')

const schema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock_qty: {
        type: Number,
        required: true
    },
})

module.exports = mongo.model('Part', schema)