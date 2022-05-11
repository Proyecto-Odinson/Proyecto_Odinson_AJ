const { Schema, model } = require('mongoose');

const EtapaSchema = new Schema ({
    nombre: {type: String , required: true},
    n_cursos: { type: Number, required: true },
})

module.exports = model('Etapa', EtapaSchema)