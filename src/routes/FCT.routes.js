const express = require('express');
const router = express.Router();

const { findFCT, crearFCT, findProfesFP, findAlumnos2ºFP, renderModifyFCT, RenderCreateFCT, updateFCT, deleteFCT } = require('../controllers/FCT.controllers');
const { isLoggedIn } = require('../middlewares/auth');

// VER ALUMNOS EN FCT

router.get('/alumnos_FCT', isLoggedIn, findFCT)

// FORM REGISTRO FCT - POR ROL

router.get('/registrar_FCT', isLoggedIn , RenderCreateFCT )
router.post('/registrar_FCT', isLoggedIn , crearFCT)

// ELIMINACION Y MODIFICACION DE FCT - POR ROL 

router.get('/mod_FCT/:id', isLoggedIn,  renderModifyFCT)
router.put('/mod_FCT/:id', isLoggedIn, updateFCT)
router.delete('/alumnos_FCT' , isLoggedIn, deleteFCT)


// FUNCIONES: VER ALUMNOS - PROFES FP

router.get('/profesFP', findProfesFP)
router.get('/alumnos2FP', findAlumnos2ºFP)


module.exports = router;

