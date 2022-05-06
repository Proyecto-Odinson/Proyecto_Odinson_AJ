const { Schema, model } = require('mongoose');

const EmpresaSchema = new Schema ({
    province: { type: Schema.Types.ObjectId, ref: 'Province', required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    nombre: {type: String , required: true },
    familia_profesional: {type: String , required: true },
    phone: {type: Number , required: true },
    phone2: {type: Number , required: false },
    email: {type: String, required: true },
    NIF: {type: String, required: true },
    fax: {type: String, required: false  },
})

module.exports = model('Empresa', EmpresaSchema)