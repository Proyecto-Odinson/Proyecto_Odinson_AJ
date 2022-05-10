const express = require('express');
const router = express.Router();
const passport = require('passport');
const { renderLoginForm, renderSignupForm, logout, crearProfesor, signup, renderCreateProfesor, renderCreateAlumno, getAllProfesores, crearAlumnno, getAllAlumnos } = require('../controllers/users.controllers');

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


router.get('/crear_profesor', isLoggedIn, role(), renderCreateProfesor);
router.post('/crear_profesor', isLoggedIn, role(), crearProfesor )

router.get('/crear_alumno', isLoggedIn, role(), renderCreateAlumno);
router.post('/crear_alumno', isLoggedIn, role(), crearAlumnno )


router.get('/profesores',  isLoggedIn, role() , getAllProfesores)
router.get('/alumnos',  isLoggedIn, role() , getAllAlumnos)

module.exports = router;