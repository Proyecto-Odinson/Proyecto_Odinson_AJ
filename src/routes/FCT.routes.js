const express = require('express');
const router = express.Router();

const { findFCT, renderCreateFCT, crearFCT, findProfesFP, findAlumnos2ºFP, renderModifyFCT, updateFCT, deleteFCT } = require('../controllers/FCT.controllers');
const { isLoggedIn, role} = require('../middlewares/auth');

// VER ALUMNOS EN FCT

router.get('/alumnos_FCT', isLoggedIn, role(), findFCT)

// FORM REGISTRO FCT

router.get('/registrar_FCT', isLoggedIn, role(), renderCreateFCT  )
router.post('/registrar_FCT', isLoggedIn, role(), crearFCT )

// ELIMINACION Y MODIFICACION DE FCT

router.get('/mod_FCT/:id', isLoggedIn, role(), renderModifyFCT)
router.put('/mod_FCT/:id', isLoggedIn, role(), updateFCT)
router.delete('/alumnos_FCT' , isLoggedIn, role(), deleteFCT)


// VER ALUMNOS - PROFES FP

router.get('/profesFP', findProfesFP)
router.get('/alumnos2FP', findAlumnos2ºFP)


module.exports = router;

