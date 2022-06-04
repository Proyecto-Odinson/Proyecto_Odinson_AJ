const express = require('express');
const router = express.Router();

const { renderShowClase, renderCreateNote, renderShowAsignaturaForProfesor , createNota,
    findAllNotas, deleteNota, renderModificarNota, modifyNota,  renderShowAsignaturaForProfesor_ETAPA, renderCreateNoteETAPA,
    createNotaETAPA, findAllNotasETAPA, renderModificarNotaETAPA, 
    renderShowClaseETAPA ,deleteNotaETAPA, modifyNotaETAPA, } = require('../controllers/notas.controllers');

const { isLoggedIn } = require('../middlewares/auth');

// RENDER PARA VER CLASE FP [SOLO PARA TUTOR]

router.get('/ShowClaseFP', isLoggedIn, renderShowClase)

// RENDER PARA VER ASIGNATURAS DE PROFESOR

router.get('/ShowAsignaturasForProfesor' , isLoggedIn , renderShowAsignaturaForProfesor )

// CREAR NOTA FP

router.get('/crearNota/:id' , isLoggedIn , renderCreateNote )
router.post('/crearNota/:id' , isLoggedIn, createNota )

// VER TODAS LAS NOTAS DE PROFESOR FP

router.get('/AllNotasforProfesor/:id' , isLoggedIn, findAllNotas )

// BORRAR Y MODIFICAR NOTAS FP

router.delete('AllNotasforProfesor/:id' , isLoggedIn , deleteNota)
router.get('/mod_nota/:id', isLoggedIn, renderModificarNota)
router.put('/mod_nota/:id', isLoggedIn, modifyNota )


/*---------------------------------------------------------------*/



// RENDER PARA VER CLASE ETAPA [SOLO PARA TUTOR]

router.get('/ShowClase_ETAPA', isLoggedIn, renderShowClaseETAPA)

// RENDER PARA VER ASIGNATURAS DE PROFESOR ETAPA

router.get('/ShowAsignaturasForProfesor_ETAPA' , isLoggedIn , renderShowAsignaturaForProfesor_ETAPA )

// CREAR NOTA ETAPA

router.get('/crearNota_ETAPA/:id' , isLoggedIn , renderCreateNoteETAPA )
router.post('/crearNota_ETAPA/:id' , isLoggedIn, createNotaETAPA )

// VER TODAS LAS NOTAS DE PROFESOR ETAPA

router.get('/AllNotasforProfesor_ETAPA/:id' , isLoggedIn, findAllNotasETAPA )

// BORRAR Y MODIFICAR NOTAS ETAPA

router.delete('AllNotasforProfesor/:id' , isLoggedIn , deleteNotaETAPA)
router.get('/mod_nota_ETAPA/:id', isLoggedIn, renderModificarNotaETAPA)
router.put('/mod_nota_ETAPA/:id', isLoggedIn, modifyNotaETAPA )



module.exports = router