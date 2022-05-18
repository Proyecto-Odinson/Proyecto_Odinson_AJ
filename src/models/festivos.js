const { Schema, model } = require('mongoose');


const FestivosSchema = new Schema({
    nombre: { type: String , required: true},
    dia: { type: String, enum: [...Array(30).keys()].map(x => x + 1) },
    mes: { type: String, enum: [...Array(12).keys()].map(x => x + 1) },
    nacional: { type: Boolean , default: false},

    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
})


module.exports = model('Festivos', FestivosSchema);