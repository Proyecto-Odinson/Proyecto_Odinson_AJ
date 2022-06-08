const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/auth')

const { createPDF_autorizaciones , createPDF_notas_finales, createPDF_etiquetas_mesas }  = require('../controllers/pdf.controllers');

// RUTA PARA GENERAR PDF

router.get('/download_autorizaciones', isLoggedIn, createPDF_autorizaciones);
router.get('/download_notas_finales', isLoggedIn, createPDF_notas_finales);
router.get('/download_etiquetas_mesas', isLoggedIn, createPDF_etiquetas_mesas);

module.exports = router;
