//Se importa la const passport con el valor del modulo passport
const passport = require('passport');

//Se crea una nueva estrategia que sera la de passport-local
const { Strategy } = require('passport-local');

//Crearemos una constante user que tendra importado los datos del archivo user.js que contiene el modelo
const { User } = require('../models/users');

//Con las costantes anteriormente creadas usaremos en passport la estrategia local
//Esta estrategia local necesitara un username y password que seran el email y password de nuestros usuarios
passport.use('local', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true

//Se verificara si el campo constraseña y password son correctos buscando el usuario introducido
// Ademas buscara en la tabla de usuarios y buscara los usuarios que tenga el campo Active: true 
}, async (req, email, password, done) => {
    const user = await User.findOne({ email, active: true});


    // En el caso de que la verificacion no sea correcta se devolvera el siguiente error
    if(!user) return done(null, false, req.flash('error', 'El usuario o la contraseña son incorrectos.'));


    //Si el usuario es correcto, pero la contraseña no, tambien lo verificaremos
    const passwordMatch = await user.checkPassword(password);

    console.log(passwordMatch);

    //Si la verificacion de la contraseña es incorrecta, devolvera error
    if(!passwordMatch) {
        return done(null, false, req.flash('error', 'El usuario o la contraseña son incorrectos.'));
    }

    //Esta funcion devolvera el ID del usuario
    return done(null, user._id);
}))


//En el caso de que el inicio de sesion sea correcto, se empaquetara con serializeUser el usuario y su ID
passport.serializeUser((user, done) => {
    done(null, user._id);
})

//Posteriormente con deserializeUser estos datos se desempaquetaran, devolviendo todos los campos de dicho usuario excepto contraseña

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).select('-password').lean();
    done(null, user);
})