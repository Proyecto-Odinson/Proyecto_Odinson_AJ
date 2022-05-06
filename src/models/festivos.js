const { Schema, model } = require('mongoose');

const festivosSchema = new Schema ({

    fecha_inicio: {type: Date , required: true},
    fecha_final: {type: Date , required: false},
    Nombre: {type: String, required: true},

    /*
    fecha: { type: Date, required: true },
    nombre: { type: String, required: true },
    localidad: { type: Schema.Types.ObjectId, ref: 'City' },
    fiesta_nacional: { type: Boolean, default: false }
     */

})

module.exports = model('festivos', festivosSchema)