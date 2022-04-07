const fs = require('fs');
const path = require('path');

class Carrito {
    constructor( direccion ){
        this.direccion = path.join(__dirname, direccion);
        this.iniciar();
    };

    async iniciar()  {
        if(!fs.existsSync(this.direccion)){
            await fs.promises.writeFile(this.direccion, '[]');
        }
    };

    //guardar un objeto
    async save(){
        try {
            const content = await this.getAll()
            const allId = content.map( c => c.id );
            const maxId = allId.length != 0 ? Math.max( ...allId ) + 1 : 1;

            const newObject = {
                id: maxId,
                timestamp: Date.now(),
                productos: []
            }
            const newContent = [...content, newObject];
            await fs.promises.writeFile(this.direccion, JSON.stringify(newContent, null, 2));            
            return newObject.id;
        } catch (error) {
            throw new Error("No se pudo guardar el dato")
        }
    };

    //buscar por ID
    async getById(id){
        try {
            const content = await this.getAll();
            const objetc = content.find( o => o.id == id );
            const result = objetc ? objetc : null;

            return result;
        } catch (error) {
            throw new Error("Producto no encontrado")
        }
    };


    //obtener todos los objetos
    async getAll(){
        try {
            const content = await fs.promises.readFile( this.direccion, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            throw new Error("No se pudo obtener los datos del documento")
        }
    };

    //Eliminar por ID
    async deleteById(id){
        try {
            let content = await this.getAll();
            content = content.filter( c => c.id !== Number(id) );
            await fs.promises.writeFile(this.direccion, JSON.stringify(content, null, 2) );
            return content;
        } catch (error) {
            throw new Error("No se pudo eliminar el dato")
        }
    };

    async getProducts(id){
        try {
            const carrito = await this.getById(id);
            return carrito.productos;
            
        } catch (error) {
            throw new Error("No se pudo obtener los productos del carrito")
        }
    }

    async addProduct(id, product){
        try {
            const content = await this.getAll();
            const index = content.findIndex(p => p.id == id);

            if(index == -1) throw new Error("Carrito no encontrado")

            content[index].productos.push(product) 

            await fs.promises.writeFile(this.direccion, JSON.stringify(content, null, 2));
            return content[index];
        } catch (error) {
            throw new Error("No se pudo modificar el producto")
        }
    }

    async deleteProduct(id, id_prod){
        try {
            const content = await this.getAll();
            const index = content.findIndex(p => p.id == id);
            if(index == -1) throw new Error("Carrito no encontrado")
            
            let productos = content[index].productos;
            content[index].productos = productos.filter(p => p.id != id_prod);

            await fs.promises.writeFile(this.direccion, JSON.stringify(content, null, 2));
            return content[index];        
        } catch (error) {
            throw new Error("No se pudo modificar el producto")
        }
    }

}


module.exports = Carrito;