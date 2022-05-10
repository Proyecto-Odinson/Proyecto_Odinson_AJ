const express = require('express');
const router = express.Router();

const { findFCT, renderCreateFCT, crearFCT } = require('../controllers/FCT.controllers');
const { isLoggedIn, role} = require('../middlewares/auth');

router.get('/alumnos_FCT', isLoggedIn, role(), findFCT)

router.get('/registrar_FCT', isLoggedIn, role(), renderCreateFCT  )
router.post('/registrar_FCT', isLoggedIn, role(), crearFCT )

module.exports = router;

