const fs = require('fs');
const path = require('path');

class Productos {
    constructor( direccion ){
        this.direccion = path.join(__dirname, direccion);
        this.iniciar();
    };

    //comprobar si el archivo existe al instanciar la clase
    async iniciar()  {
        if(!fs.existsSync(this.direccion)){
            await fs.promises.writeFile(this.direccion, '[]');
        }
    };

    //guardar un objeto
    async save(objeto){
        try {
            const content = await this.getAll();
            const allId = content.map( c => c.id );
            const maxId = allId.length != 0 ? Math.max( ...allId ) + 1 : 1;

            const newObject = {
                id: maxId,
                timestamp: Date.now(),
                ...objeto
            }

            const newContent = [...content, newObject];
            await fs.promises.writeFile(this.direccion, JSON.stringify(newContent, null, 2));

            return newContent;
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

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.direccion, '[]')
        } catch (error) {
            throw new Error("No se pudo eliminar los datos del documento");
        }
    };

    async update(id, toUpdate){
        try {
            const content = await this.getAll();
            const index = content.findIndex(p => p.id == id);

            if(index == -1) throw new Error("Producto no encontrado")
            //nombre, descripcion, codigo, url, precio, stock} = req.body;

            content[index].timestamp = Date.now();
            content[index].nombre = toUpdate.nombre;
            content[index].descripcion = toUpdate.descripcion;
            content[index].codigo = toUpdate.codigo;
            content[index].url = toUpdate.url;
            content[index].precio = toUpdate.precio;
            content[index].stock = toUpdate.stock;

            await fs.promises.writeFile(this.direccion, JSON.stringify(content, null, 2));
            return content[index];
        } catch (error) {
            throw new Error("No se pudo modificar el producto")
        }
    };
}


module.exports = Productos;