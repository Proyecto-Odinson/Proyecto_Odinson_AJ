const { Schema, model } = require('mongoose');

const FCTSchema = new Schema ({
    tutor: { type: Schema.Types.ObjectId, ref: 'Profesor' },
    alumno: { type: Schema.Types.ObjectId, ref: 'Alumno' },
    empresa : { type: Schema.Types.ObjectId, ref: 'Empresa' },
    fp: {type:Schema.Types.ObjectId, ref: 'FP' , required: true},

    fecha_inicio: {type: String , required: true},
    fecha_final: {type: String , required: true},
    horas: {type: Number, enum: [6,7,8], required: true},
    trimestre: {type: Number, enum: [1,2,3], required: true},
    tutor_laboral: { type: String , required: true},
});

module.exports = model('FCT', FCTSchema)