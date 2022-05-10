const express = require('express');
const router = express.Router();

const {findAllProvinceAsync, findCitiesFromProvince } = require('../controllers/province.controllers');

router.get('/select_province', findAllProvinceAsync)
router.get('/select_city/:id', findCitiesFromProvince)


module.exports = router;




