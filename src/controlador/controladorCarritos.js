const {CarritosDao} = require('../dao/index');
const Productos = require('../dao/productosDao');

const productos = new Productos();
const carrito = new CarritosDao();

exports.createCart = async (req, res, next) => {
    try {
        const id = await carrito.save();
        res.status(200).json(id)
    } catch (error) {
        next();
    }
}

exports.deleteCart = async (req, res, next) => {
    const {id} = req.params;
    try {
        const carritos = await carrito.deleteById(id);
        res.status(200).json(carritos)
    } catch (error) {
        next()
    }
}


exports.getProductsFromCart = async(req, res, next) => {
    const {id} = req.params
    try {
        const productos = await carrito.getProductsCart(id);
        res.status(200).json(productos)
        
    } catch (error) {
        console.log(error)
        next()
    }
}

exports.addProduct = async(req, res, next) => {
    const {id} = req.params;
    const {id_prod} = req.body;
    
    try {
        let product = await productos.getById(id_prod);

        if(!product) return res.status(404).json({"error": "not found"})
        const add = await carrito.addProduct(id, product);
        res.status(200).json(add);
    } catch (error) {
        next()
    }
}

exports.deleteProductFromCart = async(req, res, next) => {
    const {id, id_prod} = req.params;
    try {
        const respuesta = await carrito.deleteProduct(id, id_prod);
        res.status(200).json(respuesta)
    } catch (error) {
        next()
    }
};