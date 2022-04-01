
//Creamos una constante donde importamos mongoose
const mongoose = require('mongoose');


//Creamos una constante URI esta constante tendra el valor de la variable MONGODB_URI que ya esta importada
const uri = process.env.MONGODB_URI;

//Realizamos la conexion a la base de datos y sacamos tanto mensaje para caso de error como en caso de conexion satisfactoria
mongoose.connect(uri)
.then(() => console.log('La base de datos ha sido conectada'))
.catch(err => console.error(err));


//Exportamos la informacion de la conexion realizada
module.exports = mongoose.connection;