const express = require('express');
const router = express.Router();

const { findAsignaturaETAPA , findAsignaturas  } = require('../controllers/nofp.controllers');

router.get('/select_asignaturas_nofp', findAsignaturas )
router.get('/select_asignaturas_nofp/:id/:curso', findAsignaturaETAPA  )

module.exports = router;

