const express = require('express');
const router = express.Router();

const { findAllEtapas, findCicloForEtapa } = require('../controllers/ciclos.controllers');

router.get('/select_etapa', findAllEtapas)
router.get('/select_fp/:id', findCicloForEtapa)

module.exports = router;

