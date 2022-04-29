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
    
    
    module.exports = {
        findAllProvinceAsync,
        findCitiesFromProvince,
    }
    

    /*


    const prueba = async (req,res) => {

        const buscar = await City.find(
            Province.populate  ( 
                    City, { path: "province"}
                )
        )
        
        res.json(buscar);

    }

    const findCitiesFromProvince = async (req, res) => {
        const provinceId = req.params.id;

        console.log(await City.find({ province: "624bfd31221f4cd131d70bb1" }));

        console.log(provinceId);

        res.redirect('/crear_profesor')
    }

    */

 