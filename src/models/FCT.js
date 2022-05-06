const { Schema, model } = require('mongoose');

const FCTSchema = new Schema ({
    profesor: [{ type: Schema.Types.ObjectId, ref: 'Profesor' }],
    alumno: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
    empresa : [{ type: Schema.Types.ObjectId, ref: 'Empresa' }],
    tutor_laboral : [{ type: Schema.Types.ObjectId, ref: 'tutor_laboral' }],
    festivos : [{ type: Schema.Types.ObjectId, ref: 'festivos' }],
    fecha_inicio: {type: Date , required: true},
    fecha_final: {type: Date , required: false},
    horas: {type: Number, required: true},
    trimestre: {type: String, required: true},

})

module.exports = model('FCT', FCTSchema)