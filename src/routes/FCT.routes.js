const express = require('express');
const router = express.Router();

const { findFCT, renderCreateFCT, crearFCT, findProfesFP, findAlumnos2ºFP } = require('../controllers/FCT.controllers');
const { isLoggedIn, role} = require('../middlewares/auth');

router.get('/alumnos_FCT', isLoggedIn, role(), findFCT)

router.get('/registrar_FCT', isLoggedIn, role(), renderCreateFCT  )
router.post('/registrar_FCT', isLoggedIn, role(), crearFCT )

router.get('/profesFP', findProfesFP)

router.get('/alumnos2FP', findAlumnos2ºFP)

module.exports = router;

