const express = require('express');
const router = express.Router();

const {  renderCreateFestivo, crearFestivo, findFestivos, findFestivobyProvince, findFestivobyProvince_Localidad, findFestivoNacional , festivosJaen, renderModificarFestivo , updatedFestivo, deletedFestivo } = require('../controllers/festivos.controllers');
const {  isLoggedIn, role } = require ('../middlewares/auth')

// REGISTRAR FESTIVO

router.get('/registrar_festivo', isLoggedIn, role(), renderCreateFestivo  )
router.post('/registrar_festivo', isLoggedIn, role(), crearFestivo )

// MODIFICAR Y BORRAR FESTIVO

router.get('/mod_festivo/:id',  isLoggedIn, role() , renderModificarFestivo)
router.put('/mod_festivo/:id', isLoggedIn, role() , updatedFestivo )
router.delete('/festivos', isLoggedIn, role() , deletedFestivo )

// VER FESTIVOS

router.get ('/festivos' , isLoggedIn, role(), findFestivos)
router.get ('/festivosbyprovince/:id', findFestivobyProvince)
router.get ('/festivosbylocalidad/:provincia/:localidad', findFestivobyProvince_Localidad)
router.get ('/festivosNacional', findFestivoNacional)


module.exports = router;




