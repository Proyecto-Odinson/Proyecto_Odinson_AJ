const { Schema, model } = require('mongoose');

const EmpresaSchema = new Schema ({

    name: {type: String , required: true },
    familia_profesional: {type: String , required: true },
    phone: {type: Number , required: true },
    phone2: {type: Number , required: false },
    email: {type: String, required: true },
    NIF: {type: String, required: true },
    fax: {type: String, required: false  },
    phone: { type: Number, required: true },
    phone2: { type: Number, required: false},
    actividad:  { type: String , require: true},
    representante_certificado_digital :  { type: String , require: true},
    contacto: { type: String },


    calle: { type: String , required: true },
    tipo_via: { type: String , required: true },
    n_via: { type: Number , required: true },
    portal: { type: Number , required: false },
    puerta: { type: String ,  required: false },
    escalera: { type: String , required: false },
    bloque: { type: Number , required: false },
    codigo_postal:  { type: Number , require: true},
   

  
    province: { type: Schema.Types.ObjectId, ref: 'Province', required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
    
})

module.exports = model('Empresa', EmpresaSchema)