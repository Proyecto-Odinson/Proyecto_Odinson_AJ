const Province = require('../models/Provinces');
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
    

    const FestivosForProvinceAndCity = async (req, res) => {


    }

    
    module.exports = {
        findAllProvinceAsync,
        findCitiesFromProvince,
        FestivosForProvinceAndCity,
    }
    

        
 