const { Schema, model } = require('mongoose');

const FPSchema = new Schema ({
    nombre_fp: {type: String , required: true},
    etapa: { type: Schema.Types.ObjectId, ref: 'Etapa' },

})

module.exports = model('FP', FPSchema)
