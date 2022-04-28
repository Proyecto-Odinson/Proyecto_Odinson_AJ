const express = require('express');
const router = express.Router();

const { findAllProvinceAsync, findCitiesFromProvince } = require('../controllers/province.controllers');
const Provinces = require('../models/Provinces');

router.get('/select_province', findAllProvinceAsync)
router.get('/select_city/:id', findCitiesFromProvince)


module.exports = router;




/*
router.get('/provinces', async (req, res) => {

    const provinces = await Province.find();

    res.json(provinces);
})

router.get('/cities', async (req, res) => {
    const cities = await City.find();

    res.json(cities);
})

router.get('/cities/:id', async (req, res) => {

    const provinceId=req.params.id;
    const cities = await City.find({ province: provinceId });

    res.json(cities);
})
*/


