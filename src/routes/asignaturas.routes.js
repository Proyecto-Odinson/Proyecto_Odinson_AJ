const express = require('express');
const router = express.Router();

const {  findAsignaturaforFP, findAsignaturas } = require('../controllers/asignaturas.controllers');

router.get('/select_asignaturas', findAsignaturas)
router.get('/select_asignaturas/:id', findAsignaturaforFP)

module.exports = router;

