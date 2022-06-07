const { Schema, model } = require('mongoose');


const FestivosSchema = new Schema({
    nombre: { type: String , required: true},
    dia: { type: String, enum: [...Array(30).keys()].map(x => x + 1) , required: true },
    mes: { type: String, enum: [...Array(12).keys()].map(x => x + 1)  , required: true },
    nacional: { type: Boolean , default: false},

    province: { type: Schema.Types.ObjectId, ref: 'Province' , required: false },
    city: { type: Schema.Types.ObjectId, ref: 'City' , required: false },
})


module.exports = model('Festivos', FestivosSchema);