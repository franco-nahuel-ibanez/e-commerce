const admin = require('firebase-admin')
var serviceAccount = require('./ecommerce-714d0-firebase-adminsdk-lljio-8cc845b34b.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()
console.log("base de datos conectada")

module.exports = {
    db,
    admin
}

