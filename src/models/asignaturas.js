const { Schema, model } = require('mongoose');

const AsignaturasSchema = new Schema ({
    nombre: {type: String , required: true},
    etapa: { type: Schema.Types.ObjectId, ref: 'Etapa' },
    ciclo: {type: String , required: true},
    siglas: {type: String , required: true},
    year: {type: Date, required: true},
})

module.exports = model('Asignatura', AsignaturasSchema)