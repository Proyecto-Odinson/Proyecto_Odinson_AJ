const { Schema, model } = require('mongoose');

const FCTSchema = new Schema ({
    profesor: [{ type: Schema.Types.ObjectId, ref: 'Profesor' }],
    alumno: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
    empresa : [{ type: Schema.Types.ObjectId, ref: 'Empresa' }],
    festivos : [{ type: Schema.Types.ObjectId, ref: 'festivos' }],

    fecha_inicio: {type: Date , required: true},
    fecha_final: {type: Date , required: false},
    horas: {type: Number, required: true},
    trimestre: {type: String, required: true},
    tutor_laboral: {
        nombre_tutor: {type: String, required: false },
        phone_tutor: {type: String, required: false },
        email_tutor: {type: String, required: false },
        FCT : [{ type: Schema.Types.ObjectId, ref: 'FCT' }],
}

})

module.exports = model('FCT', FCTSchema)