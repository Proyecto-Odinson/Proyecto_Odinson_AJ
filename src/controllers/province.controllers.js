const Province = require('../models/Provinces');
const City = require('../models/cities');

    const findAllProvinceAsync = async (req, res) => {
        const provinces = await Province.find();

        res.json(provinces);
    }

    const findCitiesFromProvince = async (req, res) => {
        const provinceId = req.params.id;

        console.log(await City.find({ province: "624bfd31221f4cd131d70bb1" }));
        res.redirect('/crear_profesor')
    }


  module.exports = {
    findAllProvinceAsync,
    findCitiesFromProvince
}

