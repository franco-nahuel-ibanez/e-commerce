const Carrito = require('../servicos/servicioCarrito');
const Productos = require('../servicos/servicioProductos');

const productos = new Productos('../productos.txt');
const carrito = new Carrito('../carritos.txt');

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
    if( isNaN(id) ) return res.status(404).json({'error': 'not found'})
    try {
        const carritos = await carrito.deleteById(id);
        res.status(200).json(carritos)
    } catch (error) {
        next()
    }
}


exports.getProductsFromCart = async(req, res, next) => {
    const {id} = req.params;
    if(isNaN(id)) return res.status(404).json({"error": "not found"});    
    try {
        const productos = await carrito.getProducts(id);
        res.status(200).json(productos)
    } catch (error) {
        next()
    }
}

exports.addProduct = async(req, res, next) => {
    const {id} = req.params;
    const {id_prod} = req.body;
    
    if(isNaN(id_prod) || isNaN(id)) return res.status(404).json({"error": "not found"});

    try {
        const product = await productos.getById(id_prod);
        if(!product) return res.status(404).json({"error": "not found"})
        const add = await carrito.addProduct(id, product);
        res.status(200).json(add);
    } catch (error) {
        next()
    }
}

exports.deleteProductFromCart = async(req, res, next) => {
    const {id, id_prod} = req.params;
    if(isNaN(id_prod) || isNaN(id)) return res.status(404).json({"error": "not found"});
    try {
        const respuesta = await carrito.deleteProduct(id, id_prod);
        res.status(200).json(respuesta)
    } catch (error) {
        next()
    }
};