const { Schema, model } = require('mongoose');


const ProvinceSchema = new Schema({
    name: { type: String },
    showName: { type: String }
})

module.exports = model('Province', ProvinceSchema);