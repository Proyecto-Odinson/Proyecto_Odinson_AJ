const { User, Profesor, Alumno } = require('../models/users');
const Asignatura = require ('../models/asignaturas')
const fp = require ('../models/fp')
const etapas = require('../models/etapa');
const { formatDate } = require('../lib/date')
const autoProperties = require('../lib/autoproperties');

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

const renderCreateAlumnoFP = async (req, res) => {

    const profesor = req.user;

    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 
    if(!profesor.tutor.clase) return res.redirect('/')

    const asignaturasFP = await Asignatura.find({fp: profesor.tutor.clase , curso: profesor.tutor.curso});

    const FPAsignaturaArray = asignaturasFP.map( elemento => { return elemento.fp;})

    const idFP = await fp.find({_id: FPAsignaturaArray} );

    const fpJson =  JSON.parse(JSON.stringify(idFP));

    const cursosAlumno = profesor.tutor.curso
    const tipoDisciplina = profesor.tipoDisciplina

    const asignaturasFPJSON  =  JSON.parse(JSON.stringify(asignaturasFP));

    res.render('crear_alumnoFP', {fp: fpJson, cursosAlumno, tipoDisciplina , asignaturasFP: asignaturasFPJSON});
}

const renderCreateAlumnoETAPA = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor ) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/');  

    const asignaturasEtapa = await Asignatura.find({etapa: profesor.tutor.clase , curso: profesor.tutor.curso});

    const asignaturasETAPA_JSON = JSON.parse(JSON.stringify(asignaturasEtapa)); 

    const cursoAlumno = profesor.tutor.curso
    const tipoDisciplina = profesor.tipoDisciplina

    const ETAPA_AsignaturaArray = asignaturasEtapa.map( elemento => { return elemento.etapa;})

    const idETAPA = await etapas.find({_id: ETAPA_AsignaturaArray});

    const nombreEtapa = idETAPA.map( elemento => elemento._id);

    const ETAPA_JSON =  JSON.parse(JSON.stringify(nombreEtapa));

    res.render('crear_alumno_ETAPA', { asignaturasEtapa: asignaturasETAPA_JSON, cursoAlumno, tipoDisciplina , etapas: ETAPA_JSON});
}


// MODIFICACION DE ESTUDIANTE FP

const renderMoficarAlumnoFP = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor && !profesor.tutor === 'FP') return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/')

    const alumnoId = req.params.id;

    const alumno = await Alumno.findById(alumnoId).lean();

    const fecha_nac = formatDate(new Date(alumno.fecha_nac));
  
    const asignaturasFP = await Asignatura.find({fp: profesor.tutor.clase , curso: profesor.tutor.curso});

    const FPAsignaturaArray = asignaturasFP.map( elemento => { return elemento.fp;})

    const idFP = await fp.find({_id: FPAsignaturaArray} );

    const fpJson =  JSON.parse(JSON.stringify(idFP));

    const cursosAlumno = profesor.tutor.curso
    const tipoDisciplina = profesor.tipoDisciplina

    const asignaturasFPJSON  =  JSON.parse(JSON.stringify(asignaturasFP));

    res.render('mod_alumnoFP', { alumno, fecha_nac , fp: fpJson, cursosAlumno, tipoDisciplina , asignaturasFP: asignaturasFPJSON} )
}

const renderMoficarAlumnoETAPA = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor ) return res.redirect('/');
    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/');  

    const alumnoId = req.params.id;

    const alumno = await Alumno.findById(alumnoId).lean();

    const fecha_nac = formatDate(new Date(alumno.fecha_nac));

    const asignaturasEtapa = await Asignatura.find({etapa: profesor.tutor.clase , curso: profesor.tutor.curso});

    const asignaturasETAPA_JSON = JSON.parse(JSON.stringify(asignaturasEtapa)); 

    const cursoAlumno = profesor.tutor.curso
    const tipoDisciplina = profesor.tipoDisciplina

    const ETAPA_AsignaturaArray = asignaturasEtapa.map( elemento => { return elemento.etapa;})

    const idETAPA = await etapas.find({_id: ETAPA_AsignaturaArray});

    const nombreEtapa = idETAPA.map( elemento => elemento._id);

    const ETAPA_JSON =  JSON.parse(JSON.stringify(nombreEtapa));

    res.render('mod_alumno_ETAPA', { asignaturasEtapa: asignaturasETAPA_JSON, cursoAlumno, tipoDisciplina , fecha_nac , alumno , etapas: ETAPA_JSON});
}

// MODIFICACION DE ALUMMNO Y PROFESOR RENDER [SOLO PARA ADMIN ]

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
    const { firstName,  lastName, email, email2, phone, phone2, calle, tipo_via,
            n_via, portal, puerta, escalera, bloque, province, city, n_expediente, DNI, autorizacion_datos, 
            fecha_nac, asignaturas, nombre_etapa, nombre_fp, tipoDisciplina} = req.body;

    const alumno = await Alumno.findOne({ email });

    if(alumno) {
        req.flash('error', 'El nombre de usuario ya está en uso.');
        return res.redirect('signup', { firstName, lastName });
    }
    
    const username = (firstName.slice(0,3) + lastName.slice(0,3)).toLowerCase();

    const disc = tipoDisciplina === 'FP' ? nombre_fp : nombre_etapa;

    const newAlumno = Alumno({
        email,
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
        return res.redirect('/');

    } catch (error) {
        req.flash('error', 'No se ha podido crear el usuario');
        console.log(error)
        return res.redirect('/crear_alumno_ETAPA');
    } 
}


//MODIFICAR ALUMNO FP - ETAPA

const updateAlumnoFP = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor && !profesor.tutor === 'FP') return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/')

    const userId = req.params.id;
    const alumnoToUpdate = await Alumno.findById(userId);

    const alumnoUpdated = autoProperties(alumnoToUpdate, req.body);

    await alumnoUpdated.save();
    
    res.redirect('/alumnosFP')   
}

const updateAlumnoETAPA = async (req, res) => {

    const profesor = req.user;

    if(!profesor.tutor && !profesor.tutor === 'Etapa') return res.redirect('/');
    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/')

    const userId = req.params.id;
    const alumnoToUpdate = await Alumno.findById(userId);

    const alumnoUpdated = autoProperties(alumnoToUpdate, req.body);

    await alumnoUpdated.save();
    
    res.redirect('/alumnosETAPA')   
}

//MODIFICAR ALUMNO Y PROFESOR EXISTENTE [PARA ADMIN]

const updateAlumno = async (req, res) => {

    const userId = req.params.id;
    const alumnoToUpdate = await Alumno.findById(userId);

    const alumnoUpdated = autoProperties(alumnoToUpdate, req.body);

    const disciplina = req.body.tipoDisciplina === 'FP' ? req.body.nombre_fp : req.body.nombre_etapa;

    alumnoUpdated.disciplina = disciplina;

    await alumnoUpdated.save();
    
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

        const etapa_o_ciclo = req.body.tipoDisciplina === 'FP' ? req.body.tutor_ciclo : req.body.tutor_etapa;
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

// LISTADO DE PROFESORES Y ALUMNOS [PARA EL ADMIN]

const getAllProfesores = async (req, res) => {

    const profesor = req.user;
    if(!profesor.__t === 'Administrador' || profesor.jefe_departamento == 'true') return res.redirect('/')

    const profesores = await Profesor.find().lean();

    res.render('profesores', { profesores });
}


const getAllAlumnos = async (req, res) => {

    const profesor = req.user;

    if(!profesor.__t === 'Administrador' || profesor.jefe_departamento == 'true') return res.redirect('/')

    const alumno = await Alumno.find().lean().populate('disciplina')

    console.log(alumno)

    res.render('alumnos', { alumno });
   
}

// LISTADO POR ETAPA Y FP [POR ROL]

const getAllAlumnosforFP = async (req, res) => {

    const profesor = req.user

    if(!profesor.tutor && !profesor.tutor === 'FP') return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 

    const fp = profesor.tutor.clase;
    const curso = profesor.tutor.curso

   const asignaturasFP = await Asignatura.find({fp: fp , curso: curso});

   const FPAsignaturaArray = asignaturasFP.map( elemento => { return elemento._id;})

   const idAsignaturas = await Asignatura.find({_id: FPAsignaturaArray} );

   const AlumnosFP = await Alumno.find({ asignaturas: {$in: idAsignaturas}})

   const AlumnosFPJSON  =  JSON.parse(JSON.stringify(AlumnosFP));

    res.render('alumnosFP', { AlumnosFP: AlumnosFPJSON, curso, fp});
}

const getAllAlumnosforETAPA = async (req, res) => {

    const profesor = req.user

    if(!profesor.tutor && !profesor.tutor === 'Etapa') return res.redirect('/');
    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/'); 

    const etapa = profesor.tutor.clase;
    const curso = profesor.tutor.curso

   const asignaturasETAPA = await Asignatura.find({etapa: etapa , curso: curso});

   const ETAPA_AsignaturaArray = asignaturasETAPA.map( elemento => { return elemento._id;})

   const idAsignaturas = await Asignatura.find({_id: ETAPA_AsignaturaArray} );

   const AlumnosETAPA = await Alumno.find({ asignaturas: {$in: idAsignaturas}})

   const Alumnos_ETAPA_JSON  =  JSON.parse(JSON.stringify(AlumnosETAPA));

   console.log( AlumnosETAPA);

    res.render('alumnosETAPA', { AlumnosETAPA: Alumnos_ETAPA_JSON });
}

// ELIMINAR ALUMNOS FP 

const deleteAlumnoFP = async ( req, res ) => {

    const profesor = req.user

    if(!profesor.tutor && !profesor.tutor === 'FP') return res.redirect('/');
    if(profesor.tipoDisciplina !== 'FP') return res.redirect('/'); 

    try {
        const deleteAlumno = await Alumno.deleteOne ( { _id: req.body.AlumnoFP } )
        req.flash('success', 'Se ha borrado el alumno.');
        console.log(deleteAlumno)
        return res.redirect('/alumnosFP');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar el alumno');
        console.log(error)
        return res.redirect('/alumnosFP');
    }
}

// ELIMINAR ALUMNOS ETAPA

const deleteAlumnoETAPA = async ( req, res ) => {

    const profesor = req.user

    if(!profesor.tutor && !profesor.tutor === 'Etapa') return res.redirect('/');
    if(profesor.tipoDisciplina !== 'Etapa') return res.redirect('/'); 

    try {
        const deleteAlumno = await Alumno.deleteOne ( { _id: req.body.AlumnoETAPA } )
        req.flash('success', 'Se ha borrado el alumno.');
        console.log(deleteAlumno)
        return res.redirect('/alumnosETAPA');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar el alumno');
        console.log(error)
        return res.redirect('/alumnosETAPA');
    }
}

// ELIMINAR PROFES Y ALUMNOS [SOLO PARA ADMIN]

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

const deleteAlumno = async ( req, res ) => {

    try {
        const deleteAlumno = await Alumno.deleteOne ({_id: req.body.alumno} )
        req.flash('success', 'Se ha borrado el alumno.');
        console.log(deleteAlumno)
        return res.redirect('/alumnos');
    } catch (error) {
        req.flash('error', 'No se ha podido borrar el alumno');
        console.log(error)
        return res.redirect('/alumnos');
    }
}

module.exports = {
    renderLoginForm,
    renderSignupForm,
    logout,
    signup,
    renderCreateProfesor,
    renderCreateAlumnoFP,
    renderCreateAlumnoETAPA,
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
    getAllAlumnosforFP,
    getAllAlumnosforETAPA,
    deleteAlumnoFP,
    deleteAlumnoETAPA,
    renderMoficarAlumnoFP,
    updateAlumnoFP,
    updateAlumnoETAPA,
    renderMoficarAlumnoETAPA,
}

