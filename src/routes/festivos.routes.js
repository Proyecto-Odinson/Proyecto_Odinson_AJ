const express = require('express');
const router = express.Router();

const {  renderCreateFestivo, crearFestivo, findFestivos, findFestivobyProvince, findFestivobyProvince_Localidad, findFestivoNacional } = require('../controllers/festivos.controllers');
const {  isLoggedIn, role } = require ('../middlewares/auth')

// REGISTRAR FESTIVO

router.get('/registrar_festivo', isLoggedIn, role(), renderCreateFestivo  )
router.post('/registrar_festivo', isLoggedIn, role(), crearFestivo )

// VER FESTIVOS

router.get ('/festivos' , isLoggedIn, role(), findFestivos)
router.get ('/festivosbyprovince/:id', findFestivobyProvince)
router.get ('/festivosbylocalidad/:id/:LocalidadID', findFestivobyProvince_Localidad)
router.get ('/festivosNacional', findFestivoNacional)


module.exports = router;




