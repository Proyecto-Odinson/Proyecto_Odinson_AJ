const express = require('express');
const router = express.Router();
const passport = require('passport');
const { renderLoginForm, renderSignupForm, renderModificarAlumno, logout, crearProfesor, signup, renderCreateProfesor,
     getAllProfesores, getAllAlumnosforFP, getAllAlumnosforETAPA ,crearAlumnno, getAllAlumnos, deleteAlumno, updateAlumno, 
    renderModificarProfesor, updateProfesor, deleteProfesor, renderCreateAlumnoFP, renderCreateAlumnoETAPA,
    deleteAlumnoETAPA , deleteAlumnoFP , renderMoficarAlumnoFP , renderMoficarAlumnoETAPA , updateAlumnoFP, updateAlumnoETAPA} = require('../controllers/users.controllers');

const { isLoggedIn } = require('../middlewares/auth');

router.get('/', isLoggedIn, (req,res) => {
    res.render('home')
    console.log(req.user);
});
router.get('/signin', renderLoginForm);
router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}));
router.get('/signup', renderSignupForm);
router.post('/signup', signup);
router.get('/logout', logout);

// CREAR PROFESOR [SOLO PARA ADMIN Y JEFE DE DEPARTAMENTO]

router.get('/crear_profesor', isLoggedIn, renderCreateProfesor);
router.post('/crear_profesor', isLoggedIn, crearProfesor )

// CREAR ALUMNO - FP

router.get('/crear_alumnoFP', isLoggedIn, renderCreateAlumnoFP);
router.post('/crear_alumnoFP', isLoggedIn, crearAlumnno )


// CREAR ALUMNO - ETAPA

router.get('/crear_alumno_ETAPA', isLoggedIn, renderCreateAlumnoETAPA);
router.post('/crear_alumno_ETAPA', isLoggedIn, crearAlumnno )

// MODIFICAR ALUMNO ETAPA Y FP

router.get('/mod_alumnoFP/:id', isLoggedIn, renderMoficarAlumnoFP)
router.put('/mod_alumnoFP/:id', isLoggedIn, updateAlumnoFP)

router.get('/mod_alumno_ETAPA/:id', isLoggedIn, renderMoficarAlumnoETAPA)
router.put('/mod_alumno_ETAPA/:id', isLoggedIn, updateAlumnoETAPA)

// BORRAR ALUMNO FP - ETAPA 

router.delete('/alumnosFP' , isLoggedIn, deleteAlumnoFP)
router.delete('/alumnosETAPA' , isLoggedIn, deleteAlumnoETAPA)


// LISTADO DE ALUMNOS POR ETAPA y FP

router.get('/alumnosFP',  isLoggedIn, getAllAlumnosforFP )
router.get('/alumnosETAPA',  isLoggedIn, getAllAlumnosforETAPA)


// LISTADO DE ALUMNOS Y PROFESORES [SOLO PARA ADMIN Y JEFE DE DEPARTAMENTO]

router.get('/profesores',  isLoggedIn, getAllProfesores)
router.get('/alumnos',  isLoggedIn,  getAllAlumnos)


// ELIMINACION Y MODFICACION DE ALUMNOS Y PROFES [SOLO PARA ADMIN]

router.get('/mod_alumno/:id', isLoggedIn, renderModificarAlumno)
router.put('/mod_alumno/:id', isLoggedIn, updateAlumno)
router.delete('/alumnos' , isLoggedIn, deleteAlumno)

router.get('/mod_prof/:id', isLoggedIn, renderModificarProfesor)
router.put('/mod_prof/:id', isLoggedIn, updateProfesor)
router.delete('/profesores' , isLoggedIn, deleteProfesor)

module.exports = router;