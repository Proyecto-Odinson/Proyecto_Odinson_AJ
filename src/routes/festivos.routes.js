const express = require('express');
const router = express.Router();

const {  renderCreateFestivo, crearFestivo, findFestivos, findFestivobyProvince, findFestivobyProvince_Localidad, findFestivoNacional , festivosJaen, renderModificarFestivo , updatedFestivo, deletedFestivo } = require('../controllers/festivos.controllers');
const {  isLoggedIn } = require ('../middlewares/auth')

// REGISTRAR FESTIVO

router.get('/registrar_festivo', isLoggedIn,  renderCreateFestivo  )
router.post('/registrar_festivo', isLoggedIn,  crearFestivo )

// MODIFICAR Y BORRAR FESTIVO

router.get('/mod_festivo/:id',  isLoggedIn, renderModificarFestivo)
router.put('/mod_festivo/:id', isLoggedIn, updatedFestivo )
router.delete('/festivos', isLoggedIn, deletedFestivo )

// VER FESTIVOS

router.get ('/festivos' , isLoggedIn,  findFestivos)
router.get ('/festivosbyprovince/:id', findFestivobyProvince)
router.get ('/festivosbylocalidad/:provincia/:localidad', findFestivobyProvince_Localidad)
router.get ('/festivosNacional', findFestivoNacional)


module.exports = router;




