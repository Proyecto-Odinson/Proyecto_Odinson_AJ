const express = require('express');
const router = express.Router();

const {  renderDocumentosProfesarado , AlumnosAutorizaciones, ListarNotasFinales ,
    fichaAlumnos,  Asignaturas_Profesor, etiquetasMesas, firmaHuelga, InformeFCT ,
    ListadoForProfesor , ListadoForCurso, listEmpresas, eventosReuniones} = require('../controllers/documentos.controllers');

const {  isLoggedIn } = require ('../middlewares/auth');

// RENDER PARA DOCUMENTOS PROFESORADO

router.get('/documentosProfesorado', isLoggedIn, renderDocumentosProfesarado )

// RENDER PARA ALUMNOS AUTORIZACIONES [TUTOR]

router.get('/AlumnosAutorizaciones', isLoggedIn, AlumnosAutorizaciones )

// RENDER PARA VER ASIGNATURAS DE PORFESOR

router.get('/notasfinales', isLoggedIn, Asignaturas_Profesor )

// RENDER PARA VER LAS NOTAS DE UNA ASIGNATURA

router.get('/notas_finales/:id', isLoggedIn, ListarNotasFinales )

// RENDER PARA VER ETIQUETAS MESAS

router.get('/etiquetas_mesas', isLoggedIn, etiquetasMesas )

// RENDER PARA VER FICHA ALUMNOS

router.get('/ficha_alumnos', isLoggedIn, fichaAlumnos )

// RENDER PARA VER FICHA ALUMNOS

router.get('/firma_huelga', isLoggedIn, firmaHuelga )

// RENDER PARA VER INFORME FCT

router.get('/informe_FCT', isLoggedIn, InformeFCT )

// RENDER PARA VER ALUMNOS POR CLASE

router.get('/ListadoAlumnosPorCurso', isLoggedIn, ListadoForCurso )


// RENDER PARA VER ALUMNOS POR CLASE

router.get('/ListadoAlumnosPorProfesor', isLoggedIn, ListadoForProfesor )


// RENDER PARA VER EMPRESAS

router.get('/ListadoEmpresas', isLoggedIn, listEmpresas )

// RENDER EVENTOS Y REUNIONES

router.get('/eventosReuniones' , isLoggedIn , eventosReuniones)

module.exports = router;




