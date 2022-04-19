const router = require('express').Router();
const validate = require('../middleware/validate');
const controladorProductos = require('../controlador/controladorProductos');


router.get('/:id?', controladorProductos.getProducts)
router.post('/', validate, controladorProductos.addProducts );
router.delete('/:id', validate, controladorProductos.deleteProducts);
router.put('/:id', validate, controladorProductos.updateProducts )

module.exports = router;