const express = require('express');
const router = express.Router();

const { findAllEtapas, findCicloForEtapa , renderShowEtapas} = require('../controllers/etapa.controllers');

router.get('/select_etapa', findAllEtapas)
router.get('/select_fp/:id', findCicloForEtapa)

router.get('/etapas' , renderShowEtapas)

module.exports = router;

