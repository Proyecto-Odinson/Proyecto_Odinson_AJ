const express = require('express');
const router = express.Router();

const { findAllEtapas, findCicloForEtapa , renderShowEtapas} = require('../controllers/etapa.controllers');

// VER ETAPAS Y FP SIN RENDER

router.get('/select_etapa', findAllEtapas)
router.get('/select_fp/:id', findCicloForEtapa)

// VER ETAPAS RENDER 

router.get('/etapas' , renderShowEtapas)


module.exports = router;

