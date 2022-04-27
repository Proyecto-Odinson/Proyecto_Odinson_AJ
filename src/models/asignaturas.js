const { Schema, model } = require('mongoose');

const AsignaturasSchema = new Schema ({
    id: {type: String , required: true},
    nombre: {type: String , required: true},
    etapa: {type: String , required: true},
    ciclo: {type: String , required: true},
    siglas: {type: String , required: true},
})

module.exports = model('Asignaturas', AsignaturasSchema)