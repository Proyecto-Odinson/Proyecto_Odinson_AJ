const express = require('express');
const router = express.Router();
const passport = require('passport');
const { renderLoginForm, renderSignupForm, renderModificarAlumno, logout, crearProfesor, signup, renderCreateProfesor, renderCreateAlumno, getAllProfesores, crearAlumnno, getAllAlumnos, deleteAlumno, updateAlumno } = require('../controllers/users.controllers');

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


router.get('/crear_profesor/:id', isLoggedIn, role(), renderCreateProfesor);
router.post('/crear_profesor', isLoggedIn, role(), crearProfesor )

router.get('/crear_alumno', isLoggedIn, role(), renderCreateAlumno);
router.post('/crear_alumno', isLoggedIn, role(), crearAlumnno )


router.get('/profesores',  isLoggedIn, role() , getAllProfesores)
router.get('/alumnos',  isLoggedIn, role() , getAllAlumnos)


// ELIMINACION Y MODFICACION DE ALUMNOS Y PROFES

router.get('/mod_alumno/:id', isLoggedIn, role(), renderModificarAlumno)
router.put('/mod_alumno/:id', isLoggedIn, role(), updateAlumno)
router.delete('/alumnos' , isLoggedIn, role(), deleteAlumno)

module.exports = router;