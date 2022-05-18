const express = require('express');
const router = express.Router();
const passport = require('passport');
const { renderLoginForm, renderSignupForm, renderModificarAlumno, logout, crearProfesor, signup, renderCreateProfesor, 
    renderCreateAlumno,getAllProfesores, crearAlumnno, getAllAlumnos, deleteAlumno, updateAlumno, 
    renderModificarProfesor, updateProfesor, deleteProfesor } = require('../controllers/users.controllers');

const { isLoggedIn, role} = require('../middlewares/auth');


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

// CREAR PROFESOR

router.get('/crear_profesor', isLoggedIn, role(), renderCreateProfesor);
router.post('/crear_profesor', isLoggedIn, role(), crearProfesor )

// CREAR ALUMNO 

router.get('/crear_alumno', isLoggedIn, role(), renderCreateAlumno);
router.post('/crear_alumno', isLoggedIn, role(), crearAlumnno )


// LISTADO DE ALUMNOS Y PROFESORES 

router.get('/profesores',  isLoggedIn, role() , getAllProfesores)
router.get('/alumnos',  isLoggedIn, role() , getAllAlumnos)


// ELIMINACION Y MODFICACION DE ALUMNOS Y PROFES

router.get('/mod_alumno/:id', isLoggedIn, role(), renderModificarAlumno)
router.put('/mod_alumno/:id', isLoggedIn, role(), updateAlumno)
router.delete('/alumnos' , isLoggedIn, role(), deleteAlumno)

router.get('/mod_prof/:id', isLoggedIn, role(), renderModificarProfesor)
router.put('/mod_prof/:id', isLoggedIn, role(), updateProfesor)
router.delete('/profesores' , isLoggedIn, role(), deleteProfesor)

module.exports = router;