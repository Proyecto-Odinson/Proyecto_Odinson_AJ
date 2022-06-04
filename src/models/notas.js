const { Schema, model } = require('mongoose');

const NotaSchema = new Schema ({
    
     asignatura: { type: Schema.Types.ObjectId, ref: 'Asignatura', required: true },
     alumno: { type: Schema.Types.ObjectId, ref: 'Alumno' , required: true},
     profesor: { type: Schema.Types.ObjectId, ref: 'Profesor' , required: true},
     fp: { type: Schema.Types.ObjectId, ref: 'FP'},
     etapa: {type: Schema.Types.ObjectId, ref: 'Etapa'},
     trimestre:{ type: Number , required: true},
     a_escolar: { type: String },
     nota: {type: Number, required: true},
     comentario: {type: String}
})

module.exports = model('Nota', NotaSchema)