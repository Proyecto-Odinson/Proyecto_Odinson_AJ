const express = require('express');
const router = express.Router();

const { findAllEtapas, findCicloForEtapa , renderShowEtapasFP, renderShowEtapas,
    renderModifyAsignaturaETAPA, ModifyAsignaturaETAPA , renderShowAsignaturasForETAPA, renderShowCiclosForFP} = require('../controllers/etapa.controllers');

// VER ETAPAS Y FP SIN RENDER

router.get('/select_etapa', findAllEtapas)
router.get('/select_fp/:id', findCicloForEtapa)

// VER ETAPAS FP RENDER 

router.get('/ShowEtapasFP' , renderShowEtapasFP)
router.get('/ShowCiclosForFP/:id', renderShowCiclosForFP)


// VER ETAPAS RENDER [ESO Y BACHILLER] 

router.get('/ShowEtapas' , renderShowEtapas)
router.get('/ShowCursos/:id', renderShowAsignaturasForETAPA)

// MODICAR ASIGNATURA ETAPA

router.get('/mod_asig_ETAPA/:id' , renderModifyAsignaturaETAPA)
router.put('/mod_asig_ETAPA/:id' , ModifyAsignaturaETAPA)

module.exports = router;

