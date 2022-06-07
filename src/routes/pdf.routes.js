const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/auth')

const { createPDF_autorizaciones }  = require('../controllers/pdf.controllers');

// RUTA PARA GENERAR PDF

router.get('/download', isLoggedIn, createPDF_autorizaciones);

module.exports = router;
