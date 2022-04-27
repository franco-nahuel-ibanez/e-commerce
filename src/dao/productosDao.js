const {connect} = require('mongoose');
const Productos = require('./modelos/Productos');

class ProductosDao {
    constructor(collection){
        this.collection = collection
        this.connectMDB()
    }

    async connectMDB(){
        try {
            connect('mongodb://localhost:27017/ecommerce', {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        } catch (error) {
            console.log({'conexion fallida': error})
        }
    }

    async getAll(){
        try {
            const productos = await Productos.find();
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            const producto = await Productos.findById(id);
            return producto
        } catch (error) {
            console.log(error)
        }
    }

    async save(objeto){
        try {
            const producto = new Productos(objeto)
            await producto.save()
            return producto
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, newObject){
        try {
            await Productos.findByIdAndUpdate(id, newObject, {new: true})
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            await Productos.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    }

}


module.exports = ProductosDao;