const express = require('express');
const router = express.Router();

const {findAllProvinceAsync, findCitiesFromProvince , findProvinceByName } = require('../controllers/province.controllers');

router.get('/select_province', findAllProvinceAsync)
router.get('/select_city/:id', findCitiesFromProvince)

router.get('/province/:name', findProvinceByName )


module.exports = router;




