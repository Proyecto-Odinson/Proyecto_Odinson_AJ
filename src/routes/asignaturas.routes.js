const express = require('express');
const router = express.Router();

const {  findAsignaturaforFP, findAsignaturas } = require('../controllers/asignaturas.controllers');

// VER ASIGNATURAS SIN RENDER

router.get('/select_asignaturas', findAsignaturas)
router.get('/select_asignaturas/:id/:curso', findAsignaturaforFP)

module.exports = router;

