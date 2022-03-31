
//Creamos la constante Moongose que requiere del modulo mongoose/
const mongoose = require('mongoose');


//Especificamos donde se encuentra el servidor mongo

//mongoose.connect('mongodb://192.168.5.54/prueba')

//Realizamos la conexion a la base de datos y sacamos tanto mensaje para caso de error como en caso de conexion satisfactoria
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('La base de datos ha sido conectada'))
.catch(err => console.error(err));


//Exportamos todo esto como un modulo que usaremos en otros archivos
module.exports = mongoose.connection;