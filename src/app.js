const express = require('express');
const app = express();
const notFound = require('./middleware/notFound');


app.set('port', process.env.PORT || 8080);

app.use(express.urlencoded({extended: false}))
app.use(express.json());


app.use('/productos', require('./rutas/productos'));
app.use('/carrito', require('./rutas/carritos'));

app.use(notFound)

module.exports = app;