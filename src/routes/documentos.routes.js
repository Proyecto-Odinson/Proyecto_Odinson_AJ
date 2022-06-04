const express = require('express');
const router = express.Router();

const {  renderDocumentosProfesarado , AlumnosAutorizaciones } = require('../controllers/documentos.controllers');
const {  isLoggedIn } = require ('../middlewares/auth')

// RENDER PARA DOCUMENTOS PROFESORADO

router.get('/documentosProfesorado', isLoggedIn, renderDocumentosProfesarado )

// RENDER PARA ALUMNOS AUTORIZACIONES [TUTOR]

router.get('/AlumnosAutorizaciones', isLoggedIn, AlumnosAutorizaciones )


module.exports = router;




