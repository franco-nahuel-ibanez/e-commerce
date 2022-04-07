const app = require('./app');

const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})


server.on('error', error => console.log('an error has ocurred', error))