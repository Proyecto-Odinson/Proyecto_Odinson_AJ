const Province = require('../models/provinces');
const City = require('../models/cities');

    const findAllProvinceAsync = async (req, res) => {
        const provinces = await Province.find();

        res.json(provinces);
    }


    const findCitiesFromProvince = async (req,res) => {
       
        const provinceID = req.params.id;

        const findCity = await City.find({province: provinceID})

        res.json(findCity);
    }
    

const findProvinceByName = async (req, res) => {
    const name = req.params.name;

    const city = await Province.findOne({ name });

    res.json(city);
}

    
    module.exports = {
        findAllProvinceAsync,
        findCitiesFromProvince,
        findProvinceByName,
    }
