const router = require('express').Router();
const controladorCarritos = require('../controlador/controladorCarritos')


router.post('/', controladorCarritos.createCart);
router.delete('/:id', controladorCarritos.deleteCart);
router.get('/:id/productos', controladorCarritos.getProductsFromCart)
router.post('/:id/productos', controladorCarritos.addProduct)
router.delete('/:id/productos/:id_prod', controladorCarritos.deleteProductFromCart)




module.exports = router;



