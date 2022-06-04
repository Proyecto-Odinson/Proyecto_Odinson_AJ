const express = require('express');
const router = express.Router();

const { getAlumnosFromModuleOfProfesor, findAsignaturaforFP, findAsignaturas, ShowAsignaturasForFP, renderModificarAsignatura, ModifyAsignaturaFP } = require('../controllers/asignaturas.controllers');

const { isLoggedIn } = require('../middlewares/auth');

// VER ASIGNATURAS SIN RENDER

router.get('/select_asignaturas', findAsignaturas)
router.get('/select_asignaturas/:id/:curso', findAsignaturaforFP)

// VER ASIGNATURAS DE FP RENDER

router.get('/ShowAsignaturasForFP/:id', ShowAsignaturasForFP)

// MODIFICACION DE ASIGNATURAS

router.get('/mod_asig_fp/:id', isLoggedIn, renderModificarAsignatura)
router.put('/mod_asig_fp/:id', isLoggedIn,  ModifyAsignaturaFP)

// VER ASIGNATURAS POR ROLES 

router.get('/getAsignaturas', isLoggedIn, getAlumnosFromModuleOfProfesor);


module.exports = router;

