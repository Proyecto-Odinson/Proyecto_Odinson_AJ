const { Schema, model } = require('mongoose');


const CitySchema = new Schema({
    province: { type: Schema.Types.ObjectId, ref: 'Province' },
    name: { type: String }
})

module.exports = model('City', CitySchema);