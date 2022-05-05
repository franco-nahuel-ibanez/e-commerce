const {ProductosDao} = require('../dao/index');
const productos = new ProductosDao();

exports.getProducts = async(req, res, next) => {
    const {id} = req.params;
    try {
        if(id){
            const producto = await productos.getById(id);
            if(!producto) return res.status(404).json({'error': 'not found.'});
            return res.status(200).json(producto);
        }

        const respuesta = await productos.getAll();
        res.status(200).json(respuesta)
    } catch (error) {
        next()
    }
};

exports.addProducts = async(req, res, next) => {
    const {nombre, descripcion, codigo, url, precio, stock} = req.body;
    if(!nombre || !descripcion || !codigo || !url || !precio || !stock) return res.status(400).json({'error': 'all data is required'});

    try {
        const respuesta = await productos.save(req.body)
        res.status(201).json(respuesta);
    } catch (error) {
        next()
    }
}

exports.updateProducts = async (req, res, next) => {
    const {id} = req.params;
    const {nombre, descripcion, codigo, url, precio, stock} = req.body;

    if(!nombre || !descripcion || !codigo || !url || !precio || !stock) return res.status(400).json({'error': 'all data is required'});
    try {
        const nuevoProducto = await productos.update(id, req.body);
        res.status(200).json(nuevoProducto);
    } catch (error) {
        next()
    }
}


exports.deleteProducts = async (req, res, next) => {
    const {id} = req.params;
    try {
        await productos.deleteById(id);
        res.status(200).json({"msj": "deleted product"});
    } catch (error) {
        next()
    }
}