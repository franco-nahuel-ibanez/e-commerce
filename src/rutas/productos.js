const router = require('express').Router();
const validate = require('../middleware/validate');
const controladorProductos = require('../controlador/controladorProductos');

// let products = [
//     {   
//         id: 1,
//         title: 'tele',
//         price: 4500,
//         thumbnail: 'tele.jpg'
//     },
//     {   
//         id: 2,
//         title: 'estereo',
//         price: 1500,
//         thumbnail: 'estereo.jpg'
//     }
// ];

router.get('/:id?', controladorProductos.getProducts)
router.post('/', validate, controladorProductos.addProducts );
router.delete('/:id', validate, controladorProductos.deleteProducts);
router.put('/:id', validate, controladorProductos.updateProducts )

module.exports = router;