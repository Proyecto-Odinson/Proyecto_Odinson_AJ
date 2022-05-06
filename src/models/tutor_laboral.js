const { Schema, model } = require('mongoose');

const tutor_laboralSchema = new Schema ({
    nombre: {type: String, required: true },
    phone: {type: String, required: true },
    email: {type: String, required: true },
    FCT : [{ type: Schema.Types.ObjectId, ref: 'FCT' }],
    Empresa : { type: Schema.Types.ObjectId, ref: 'Empresa' },

})

module.exports = model('tutor_laboral', tutor_laboralSchema)