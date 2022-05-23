const { User, Profesor, Alumno } = require('../models/Users');
const { formatDate } = require('../lib/date')

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


// MODIFICACION DE ALUMMNO Y PROFESOR RENDER

const renderModificarAlumno = async (req, res) => {
    const alumnoId = req.params.id;

    const alumno = await Alumno.findById(alumnoId).lean();

    const fecha_nac = formatDate(new Date(alumno.fecha_nac));

    res.render('mod_estudiantes', { alumno, fecha_nac });
}


const renderModificarProfesor = async (req, res) => {
    const profesorId = req.params.id;

    const profesor = await Profesor.findById(profesorId).lean();

    res.render('mod_profesores', { profesor });
}


//CREACION PROFESOR

const crearProfesor = async (req, res) => {
    const { password, password2,  firstName,  lastName, email, email2, phone, phone2, calle, tipo_via,
             nombre_via, n_via, portal, puerta, escalera, bloque, province, city , jefe_departamento, codigo,  tutor_ciclo, tutor_etapa, tutor_curso, tipo_etapa} = req.body;

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

    const etapa_o_ciclo = tipo_etapa === 'FP' ? tutor_ciclo : tutor_etapa;

    //const constante = condicional ? valor si verdadero : valor si falso;
    
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
        jefe_departamento,
        codigo, 
        tutor: {
            clase: etapa_o_ciclo,
            curso: tutor_curso ,
        },

        tipoDisciplina: tipo_etapa ,
    });

    try {
        await newProfesor.save();
        req.flash('success', 'Se ha creado correctamente su cuenta.');
        console.log(newProfesor)
        return res.redirect('/profesores');

    } catch (error) {
        req.flash('error', 'No se ha podido crear el usuario');
        console.log(error)
        return res.redirect('/crear_profesor');
    }
}

//CREACION ALUMNOS

const crearAlumnno = async (req, res) => {
    const { password, password2,  firstName,  lastName, email, email2, phone, phone2, calle, tipo_via,
            n_via, portal, puerta, escalera, bloque, province, city, n_expediente, DNI, autorizacion_datos, 
            fecha_nac, asignaturas, nombre_etapa, nombre_fp, tipoDisciplina} = req.body;

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

    const disc = tipoDisciplina === 'FP' ? nombre_fp : nombre_etapa;

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
        asignaturas: asignaturas,
        tipoDisciplina,
        disciplina: disc

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

//MODIFICAR ALUMNO Y PROFESOR EXISTENTE

const updateAlumno = async (req, res) => {

    const userId = req.params.id;
    const updatedAlumno = await Alumno.findById(userId);

    const properties = Object.keys(req.body);

    for (let property of properties) { 

        let value = req.body[property]; 
        if(value) {
            updatedAlumno[property] = value 
        }
    }

    const disciplina = req.body.tipoDisciplina === 'FP' ? req.body.nombre_fp : req.body.nombre_etapa;

    updatedAlumno.disciplina = disciplina;

    await updatedAlumno.save();
    
    res.redirect('/alumnos')   
}

const updateProfesor = async (req, res) => {


    const userId = req.params.id;
    const updatedProfesor = await Profesor.findById(userId);

    const properties = Object.keys(req.body);
    
    for(let property of properties) {

        let value = req.body[property];

        if(value || typeof value === 'boolean') {
            if(property !== 'tutor') {
                updatedProfesor[property] = value;
                console.log(property, value);
            }
            
        }
    }
    
    if(Boolean(req.body.tutor)) {

        const etapa_o_ciclo = req.body.tipo_etapa === 'FP' ? req.body.tutor_ciclo : req.body.tutor_etapa;
        const tutor = {
            clase: etapa_o_ciclo,
            curso: req.body.tutor_curso ,
        }

        updatedProfesor.tutor = tutor;
    } else {
        delete updatedProfesor.tutor;
    }

    await updatedProfesor.save();

    res.redirect('/profesores')

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


// ELIMINAR  PROFES Y ALUMNOS

const deleteAlumno = async ( req, res ) => {

    try {
        const deleteAlumno = await Alumno.deleteOne ( { _id: req.body.alumno } )
        req.flash('success', 'Se ha borrado el alumno.');
        console.log(deleteAlumno)
        return res.redirect('/alumnos');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar el alumno');
        console.log(error)
        return res.redirect('/alumnos');
    }
}

const deleteProfesor = async ( req, res ) => {

    try {
        const deleteProfesor = await Profesor.deleteOne ( { _id: req.body.profesor } )
        req.flash('success', 'Se ha borrado el profesor.');
        console.log(deleteProfesor)
        return res.redirect('/profesores');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar el profesor');
        console.log(error)
        return res.redirect('/profesores');
    }
}

module.exports = {
    renderLoginForm,
    renderSignupForm,
    logout,
    signup,
    renderCreateProfesor,
    renderCreateAlumno,
    renderModificarAlumno,
    renderModificarProfesor,
    crearProfesor,
    crearAlumnno,
    getAllProfesores,
    getAllAlumnos,
    deleteAlumno,
    deleteProfesor,
    updateAlumno,
    updateProfesor,
}

