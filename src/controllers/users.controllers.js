const { User, Profesor, Alumno } = require('../models/Users');

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

//CREACION PROFESOR

const crearProfesor = async (req, res) => {
    const { password, password2,  firstName,  lastName, email, email2, phone, phone2, calle, tipo_via,
             nombre_via, n_via, portal, puerta, escalera, bloque, province, city , jefe_departamento, codigo, tutor} = req.body;

    const profesor = await Profesor.findOne({ email });

    if(profesor) {
        req.flash('error', 'El nombre de usuario ya está en uso.');
        return res.render('signup', { firstName, lastName });
    }

    if(password !== password2) {
        req.flash('error', 'Las contraseñas no coinciden.');
        return res.redirect('/crear_profesor');
    }

    const username = (firstName.slice(0,3) + lastName.slice(0,3)).toLowerCase();

    const newProfesor = Profesor({
        email,
        password, 
        firstName,
        lastName,
        username,
        email, 
        email2, 
        phone, 
        phone2, 
        calle, 
        tipo_via,    
        nombre_via,
        n_via, 
        portal,
        puerta,
        escalera,
        bloque,
        province,
        city,
        jefe_departamento: Boolean(jefe_departamento),
        codigo, 
        tutor: Boolean(tutor)
    });

    await newProfesor.save();

    req.flash('success', 'Se ha creado correctamente su cuenta.');
    res.redirect('/profesores');
}

//CREACION ALUMNOS

const crearAlumnno = async (req, res) => {
    const { password, password2,  firstName,  lastName, email, email2, phone, phone2, calle, tipo_via,
            n_via, portal, puerta, escalera, bloque, province, city, n_expediente, DNI, autorizacion_datos, fecha_nac, asignaturas, nombre_etapa, nombre_fp, n_cursos} = req.body;

    const alumno = await Alumno.findOne({ email });

    if(alumno) {
        req.flash('error', 'El nombre de usuario ya está en uso.');
        return res.redirect('signup', { firstName, lastName });
    }

    if(password !== password2) {
        req.flash('error', 'Las contraseñas no coinciden.');
        return res.redirect('/crear_alumno');
    }

    const username = (firstName.slice(0,3) + lastName.slice(0,3)).toLowerCase();

    const newAlumno = Alumno({
        email,
        password, 
        firstName,
        lastName,
        username,
        email, 
        email2, 
        phone, 
        phone2, 
        calle, 
        tipo_via,    
        n_via, 
        portal,
        puerta,
        escalera,
        bloque,
        province,
        city,
        n_expediente, 
        DNI,
        autorizacion_datos, 
        fecha_nac,
        etapa: nombre_etapa,
        fp: nombre_fp,
        asignaturas: asignaturas,

    });

    
    try {
        await newAlumno.save();
        req.flash('success', 'Se ha creado correctamente su cuenta.');
        console.log(newAlumno)
        return res.redirect('/alumnos');

    } catch (error) {
        req.flash('error', 'No se ha podido crear el usuario');
        console.log(error)
        return res.redirect('/crear_alumno');
    }
}



// LISTADO DE PROFESORES Y ALUMNOS

const getAllProfesores = async (req, res) => {

    const profesores = await Profesor.find().lean();

    res.render('profesores', { profesores });
}


const getAllAlumnos = async (req, res) => {

    const alumno = await Alumno.find().lean();

    res.render('alumnos', { alumno });
   
}


module.exports = {
    renderLoginForm,
    renderSignupForm,
    logout,
    signup,
    renderCreateProfesor,
    renderCreateAlumno,
    crearProfesor,
    crearAlumnno,
    getAllProfesores,
    getAllAlumnos,
}
