// funcion para verificar si el usuario que esta intentando acceder a una ruta
// es un usario logueado de forma coreecta

const isLoggedIn = (req, res, next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/signin');
    
}

module.exports = {
    isLoggedIn,
}