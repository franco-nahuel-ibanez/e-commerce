const {Schema, model} = require('mongoose')

const productosSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    codigo: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        default: 1
    }
})

module.exports = model('Productos', productosSchema);