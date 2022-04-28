const { User, Profesor, Alumno } = require('../models/Users');
const Users = require('../models/Users');

const renderLoginForm = (req, res) => {
    res.render('signin', { layout: 'vacio' });
}

const renderSignupForm = (req, res) => {
    res.render('signup');
}

const logout = (req, res) => {
    req.logout();
    res.redirect('/signin');
}

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.findOne({ email });

    if(user) {
        req.flash('error', 'El nombre de usuario ya está en uso.');
        return res.render('signup', { firstName, lastName });
    }

    if(password !== password2) {
        req.flash('error', 'Las contraseñas no coinciden.');
        return res.render('signup', { firstName, lastName, username });
    }

    const username = firstName.slice(0,2) + lastName.slice(0,2);

    const newUser = User({
        firstName,
        lastName,
        username,
        email,
        password
    });

    await newUser.save();

    req.flash('success', 'Se ha creado correctamente su cuenta.');
    res.redirect('/signin');
}

const renderCreateProfesor = (req, res) => {
    res.render('crear_profesor');
}

const renderCreateAlumno = (req, res) => {
    res.render('crear_alumno');
}

const crearProfesor = async (req, res) => {
    const {firstName, lastName, email, password, password2 } = req.body;

    const user = await User.findOne({ email });

    if(user) {
        req.flash('error', 'El nombre de usuario ya está en uso.');
        return res.render('signup', { firstName, lastName });
    }

    if(password !== password2) {
        req.flash('error', 'Las contraseñas no coinciden.');
        return res.render('signup', { firstName, lastName, username });
    }

    const username = firstName.slice(0,2) + lastName.slice(0,2);

    const newProfesor = Profesor({
        email,
    });

    await newProfesor.save();

    req.flash('success', 'Se ha creado correctamente su cuenta.');
    res.redirect('/signin');
}
    


module.exports = {
    renderLoginForm,
    renderSignupForm,
    logout,
    signup,
    renderCreateProfesor,
    renderCreateAlumno,
    crearProfesor
}

