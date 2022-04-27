const isLoggedIn = (req, res, next) => {

    if(req.isAuthenticated()) return next();
    res.redirect('/signin');
    
}

const role = (rol) => {
    return (req, res, next) => {
        if(req.user.__t === 'Administrador' || req.user.__t === rol) {
            return next()
        }
        req.flash('error', 'No tienes permisos para acceder a este recurso');
        res.redirect('/');
    }
}

module.exports = {
    isLoggedIn,
    role
}