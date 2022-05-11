const { Schema, model } = require('mongoose');

const FCTSchema = new Schema ({
    tutor: [{ type: Schema.Types.ObjectId, ref: 'Profesor' }],
    alumno: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
    empresa : [{ type: Schema.Types.ObjectId, ref: 'Empresa' }],

    fecha_inicio: {type: String , required: true},
    fecha_final: {type: String , required: false},
    horas: {type: Number, required: true},
    trimestre: {type: Number , required: true},
    cargo: { type: String , required: false},

    tutor_laboral: {
        nombre_tutor: {type: String, required: false },
        phone_tutor: {type: String, required: false },
        email_tutor: {type: String, required: false },
    }

});

module.exports = model('FCT', FCTSchema)