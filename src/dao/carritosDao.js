const {db} = require('./db/config');

class CarritosDao{
    constructor(){
        this.carritos = db.collection("carritos")
    }

    async getAll(){
        const carritos = await this.carritos.get()
        return carritos.docs[0].data()
    }

    async save(){
        try {
            const newCart = {
                timestamp: Date.now(),
                productos: []
            }

            const id = await this.carritos.add(newCart)
            return id._path.segments[1]

        } catch (error) {
            throw new Error("Error al guardar")
        }
    }

    async getById(id){
        try {
            const carrito = this.carritos.doc(String(id))
            const resultado = await carrito.get()
            return resultado.data()
        } catch (error) {
            throw new Error("Carrito no encontrado")
        }
    }

    async getProductsCart(id){
        try {
            const carrito = await this.getById(id)
            return carrito.productos
        } catch (error) {
            throw new Error("Error al obtener los productos")
        }
    }

    async deleteById(id){
        try {
            await this.carritos.doc(id).delete()
            return "deleted"
        } catch (error) {
            throw new Error("Error al obtener el carrito")
        }
    }

    async updateCart(id, newCart){
        try {
            this.carritos.doc(id).update(newCart)
        } catch (error) {
            throw new Error("Error al actualizar carrito")
        }
    }

    async addProduct(id, newProduct){
        try {            
            let productosDB = await this.getProductsCart(id)

            const idProducts = productosDB.map( p => p.id_cart )
            const maxId = Math.max(...idProducts) + 1;
            const newId = maxId > 0 ? maxId: 1

            const producto = {
                nombre: newProduct.nombre,
                descripcion: newProduct.descripcion,
                codigo: newProduct.codigo,
                precio: newProduct.precio,
                url: newProduct.url,
                stock: newProduct.stock,
                id_cart: newId
            }

            productosDB.push(producto)

            const carrito = this.carritos.doc(id)

            await carrito.update({
                productos: productosDB
            })

            return producto
        } catch (error) {
            console.log(error)
            throw new Error("Error al guardar los datos")
        }
    }

    async deleteProduct(id, id_prod){
        try {
            const productosDB = await this.getProductsCart(id)
            const newProducts = productosDB.filter( p => p.id_cart != id_prod)
            const carrito = this.carritos.doc(id)
            await carrito.update({ productos: newProducts })
            return newProducts
        } catch (error) {
            throw new Error("Error el eliminar producto")
        }
    }
}


module.exports = CarritosDao