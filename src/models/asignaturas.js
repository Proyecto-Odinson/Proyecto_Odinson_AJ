const { Schema, model } = require('mongoose');

const AsignaturasSchema = new Schema ({
    nombre_asignatura: {type: String , required: false},
    siglas: {type: String , required: false},
    curso: {type: Number, required: false},
    horario: [
        {
            dia_semana: {type: String , required: true},
            hora_inicio: {type: String , required: true},
            hora_fin: {type: String , required: true},
            aula: {type: String , required: true},
            desdoble: {type: Boolean , required: false}
        }
    ],

    fp: { type: Schema.Types.ObjectId, ref: 'FP' },
    profesor: { type: Schema.Types.ObjectId, ref: 'Profesor' },
    etapa: { type: Schema.Types.ObjectId, ref: 'Etapa' },

})

module.exports = model('Asignatura', AsignaturasSchema)